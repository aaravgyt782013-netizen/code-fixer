// VirusTotal file-hash reputation lookup for ARCodes.
// Configure VIRUSTOTAL_API_KEY in Vercel Environment Variables.
// This endpoint receives only a SHA-256 hash; it never receives file bytes.
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST for hash lookups.' });
  }

  const hash = typeof req.body?.hash === 'string' ? req.body.hash.trim().toLowerCase() : '';
  if (!/^[a-f0-9]{64}$/.test(hash)) {
    return res.status(400).json({ error: 'Provide a valid 64-character SHA-256 hash.' });
  }

  const apiKey = process.env.VIRUSTOTAL_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ configured: false, found: false });
  }

  try {
    const response = await fetch('https://www.virustotal.com/api/v3/files/' + encodeURIComponent(hash), {
      method: 'GET',
      headers: { 'x-apikey': apiKey, 'accept': 'application/json' }
    });

    if (response.status === 404) {
      return res.status(200).json({ configured: true, found: false });
    }
    if (response.status === 401 || response.status === 403) {
      return res.status(502).json({ error: 'VirusTotal rejected the API key or the key lacks permission. Check VIRUSTOTAL_API_KEY.' });
    }
    if (response.status === 429) {
      return res.status(429).json({ error: 'VirusTotal rate limit reached. Wait before trying again.' });
    }
    if (!response.ok) {
      return res.status(502).json({ error: 'VirusTotal lookup failed with status ' + response.status + '.' });
    }

    const body = await response.json();
    const attributes = body?.data?.attributes || {};
    const stats = attributes.last_analysis_stats || {};
    const results = attributes.last_analysis_results || {};
    const detections = Object.entries(results)
      .filter(([, result]) => result && (result.category === 'malicious' || result.category === 'suspicious'))
      .slice(0, 12)
      .map(([engine, result]) => ({ engine, result: String(result.result || result.category || 'flagged').slice(0, 160) }));

    return res.status(200).json({
      configured: true,
      found: true,
      stats,
      detections,
      lastAnalysis: attributes.last_analysis_date
        ? new Date(attributes.last_analysis_date * 1000).toISOString()
        : null,
      permalink: 'https://www.virustotal.com/gui/file/' + hash
    });
  } catch (error) {
    return res.status(502).json({ error: 'Could not reach VirusTotal. Try again later.' });
  }
};
