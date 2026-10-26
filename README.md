# Kairologic Technology

A concise, responsive showcase of workflow implementation: connected records, document automation and dashboards. Includes a working enquiry form and a private owner inbox.

See [the current design and runtime notes](docs/corporate-outline.md).

## Development

Node.js 22.13 or later is required. Install dependencies using the Sites installation helper, then use `npm run dev`. Production builds use the Sites build helper or `npm run build`.

D1 is declared as `DB` in `.openai/hosting.json`; generated schema migrations are under `drizzle/`. Configure `ENQUIRY_REVIEWER_EMAIL` as a server-side runtime value to enable the private `/enquiries` inbox. Never commit a real email setting or credentials. No outbound email service is configured; enquiries are saved to the database for owner review.

Public marketing content contains no telephone number or third-party platform names. Example case records, dashboard counts and photographs are illustrative.
