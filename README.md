# ARCodes — Developer Command Center

ARCodes is a mobile-first developer workspace with a dark terminal-inspired interface, practical local utilities, a sandboxed HTML/CSS/JavaScript playground, and AI-assisted code generation and debugging powered by Google Gemini.

## Features

- **AI Studio** — build, explain, review, refactor, convert, and test code using a natural-language prompt.
- **Code Fixer** — submit code and an error description for AI-assisted diagnosis and suggested fixes.
- **Live Playground** — edit HTML, CSS, and JavaScript with a sandboxed iframe preview.
- **Local utilities** — JSON formatter/minifier, regular-expression tester, Base64 encoder/decoder, URL encoder/decoder, HTML formatter, timestamp converter, UUID v4 generator, and HEX/RGB color converter.
- **Responsive UI** — mobile navigation, search, keyboard shortcut (Ctrl/Cmd + K), loading feedback, status messages, and copy actions.

## Configure Gemini on Vercel

1. Open Google AI Studio and create an API key for the Gemini API: https://aistudio.google.com/app/apikey
2. In Vercel, open the **code-fixer** project → **Settings** → **Environment Variables**.
3. Add **GEMINI_API_KEY** with your key. Select **Production** and **Preview** if you use preview deployments. Keep the key server-side; never put it in browser code or commit it to GitHub.
4. Optionally add **GEMINI_MODEL** with a model available to your API key. The default is **gemini-2.5-flash**.
5. Redeploy the project after adding/changing variables.
6. Remove the old **OPENAI_API_KEY** variable if it is no longer used by any other function in this project.

The AI UI calls the Vercel serverless endpoint at `/api/generate`. The endpoint sends requests to Google Gemini and returns generated text. If the key is missing, invalid, restricted, or out of quota, the UI displays the API error. Model availability and quotas depend on your Google AI Studio/API setup.

## Run locally

The front end is `index.html`, but AI Studio needs the Vercel serverless function in `api/generate.js`. Opening the HTML file directly does not provide that endpoint. Use Vercel's local development server to test the front end and API together.

## Privacy and safety

- Local formatting and conversion tools run in your browser.
- Prompts and code submitted through AI Studio or Code Fixer are sent to Google Gemini through the server endpoint. Do not paste passwords, API keys, access tokens, private customer data, or other secrets into prompts.
- AI-generated code is a suggestion, not proof that it compiles or is secure. Review and test it before using it in a real project.
- The playground is a learning preview, not a production hosting environment.
