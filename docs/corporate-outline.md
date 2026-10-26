# Kairologic: concise corporate showcase

## Purpose

A short, presentation-led website that explains configured workflow implementation. It introduces connected records, document automation and dashboards, with case/legal/recovery operations as the example. It does not imply that the team created the underlying platforms or already has customers.

## Design decisions

- Flat, custom K mark and a substantial Kairologic wordmark. SVG logo assets are in `public/`.
- Navy opening and footer; white and pale-grey reading sections; blue and teal accents.
- Main copy is 22px on desktop and 20px on mobile. Form labels are 18px. Supporting product labels are generally at least 16px. The small logo descriptor is part of the brand lockup.
- Three selectable capabilities replace the long list of sections and stage details. The document illustration populates sample fields; the dashboard highlights a selected stage.
- No public telephone number or third-party platform names in marketing copy. Product records and chart values are clearly illustrative.
- Security wording describes controls to define and verify during implementation. It makes no unverified certification, data-residency or encryption promises.

## Enquiry workflow

`POST /api/enquiries` validates name, email, organisation, message, consent and an idempotency UUID. It stores submissions in D1. There is no automatic email delivery or marketing subscription.

The form includes browser/server validation, a hidden bot field, an origin check, a bounded payload and a hashed network identifier used for rate limiting. Repeating an accepted request UUID does not create a duplicate. Enquiry data is not exposed through a public read API.

The private `/enquiries` inbox requires dispatch-authenticated identity and an exact match with the server-side `ENQUIRY_REVIEWER_EMAIL` runtime value. It displays the latest 100 submissions. Configure that value in the host's runtime settings, not in source. The site audience remains owner-private for review.

`/privacy` explains collection, intended use and how to request changes. No real case records should be sent through this initial enquiry form.

## Runtime

The static review export has been migrated to the supported Vinext server runtime so submissions can be stored durably. React application source remains under `app/` and `components/`. The maintained Sites Vite/Worker integration is retained. D1 schema and generated migration metadata are committed under `db/` and `drizzle/`.

Use the Sites installation and build helpers. Standalone commands: `npm run dev`, `npm run build`, `npx tsc --noEmit`, and `npm run db:generate` when the database schema changes. Apply local migrations before testing the enquiry API. Hosted migrations are applied during publication.

## Research basis

The design uses the earlier reviews of Credgenics and DPDzero for capability clarity, while following the boss's request for an outline. It deliberately omits unearned customer logos and company-scale claims. W3C guidance on contrast and text enlargement informed readability checks:

- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html

The photographs are the earlier generated illustrative assets. Their original prompts are retained in `docs/visual-refresh.md`.
