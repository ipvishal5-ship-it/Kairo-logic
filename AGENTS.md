# Kairologic Technologies — Development & Content Rules

## 1. Core Company Philosophy
- **"We are not made by our work — we make the work go."**
- Never define Kairologic exclusively by SARFAESI, eCourt, or Manufacturing. Those are specific solutions. Kairologic is a business workflow & systems company that makes real business work move forward cleanly and on time.

## 2. Content & Copywriting Standards (Mandatory)
- **Zero Jargon:** Speak in clear, friendly, human terms. Ban dense tech buzzwords and hyper-specialized legal codes on general pages.
- **Catchy & Commercial:** Speak to the universal pains of lost files, broken spreadsheets, delayed follow-ups, and disconnected teams.
- **Legally Safe & Defensible:** 
  - Never make absolute guarantees ("100% error-free", "zero risk", "guaranteed compliance").
  - Always use defensible terms ("designed to minimize errors", "structured audit trails", "standardized steps").
  - Always mark mock company or person names as "Illustrative sample data".
  - Factual privacy claims only.

## 3. Systematic Execution & Code Integrity
- Always test with `npx tsc --noEmit` and check dev server response before concluding any change.
- Never break mobile responsiveness or cause horizontal overflow.
- Maintain clean, modular code with zero console errors.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
