# ARCodes — Developer Command Center

ARCodes is a mobile-first developer workspace with a dark terminal-inspired interface, practical local utilities, an HTML/CSS/JavaScript playground, and AI-assisted code generation and debugging.

## Features

- **AI Studio** — build, explain, review, refactor, convert, and test code with a natural-language prompt.
- **Code Fixer** — submit relevant code and an error description for an AI-assisted diagnosis and suggested fix.
- **Live Playground** — edit HTML, CSS, and JavaScript with a sandboxed iframe preview.
- **Local utilities** — JSON formatter/minifier, regular-expression tester, Base64 encoder/decoder, URL component encoder/decoder, lightweight HTML formatter, timestamp converter, UUID v4 generator, and HEX/RGB color converter.
- **Responsive UI** — mobile sidebar, search, keyboard shortcut (Ctrl/Cmd + K), loading feedback, status messages, and copy actions.

## Deploy on Vercel

1. Import this repository into Vercel and deploy the main branch.
2. In Project Settings → Environment Variables, add OPENAI_API_KEY for Production (and Preview if you use preview deployments). Never put the key in browser-side code or commit it to GitHub.
3. Optionally add OPENAI_MODEL to select a model available to your OpenAI API project. The server function defaults to gpt-5-mini.
4. Optionally add VIRUSTOTAL_API_KEY only if you restore or use a VirusTotal-backed scan endpoint in this project.
5. Redeploy after changing environment variables.

The AI UI calls the serverless endpoint at /api/generate. That endpoint keeps the API key server-side and accepts POST requests. The AI features will show an error if the key is missing, invalid, out of quota, or the API request fails.

## Run locally

The front end is a static index.html, but AI Studio needs the Vercel serverless function in api/generate.js. Opening the HTML file directly does not provide that API endpoint. Run the project with Vercel's local development server to test both UI and API together.

## Privacy and safety

- Local formatting and conversion tools run in your browser.
- Text and code submitted through AI Studio or Code Fixer are sent to the configured AI provider via the server endpoint so it can answer the request. Do not paste passwords, API keys, access tokens, private customer data, or other secrets.
- AI-generated code is a suggestion, not proof that code compiles or is secure. Review it and test it before using it in a real project.
- The playground runs submitted JavaScript in a sandboxed iframe; treat it as a learning preview, not a production hosting environment.
