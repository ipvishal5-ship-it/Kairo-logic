# Corporate website review

Reviewed on 27 October 2026. The production build and TypeScript check pass. Desktop browser checks used a 1363 by 936 viewport. Mobile browser emulation is not exposed by the available browser API; responsive CSS was reviewed, but mobile visual checks remain unverified.

## Hard gates

- R02 PASS authored UI copy has no em dashes.
- R03 Desktop PASS the homepage has no horizontal overflow. Responsive source uses one column under 600 pixels, expanding inputs and wrapping navigation. Mobile visual verification remains outstanding.
- R17 R18 PASS no invented client metrics, customer names, testimonials or avatars were added. Existing product examples are explicitly marked sample or illustrative.
- R23 PASS the existing approved K mark was reused; the owner confirmed the company name and the content plan supplies the navigation structure.
- R24 PASS Company opens about, Technologies opens the catalogue, and View the product opens the product detail route in the browser. Contact and privacy have implemented routes.
- R25 PASS company palette contrast ratios are body 13.79 to 1, secondary text 7.00 to 1, green text 7.91 to 1, invitation text 10.87 to 1 and footer text 10.68 to 1.
- R26 PASS documented controls have real destinations or React event handlers. Browser checks confirmed workspace Documents and Team access, Prepare, Populate fields, Act, and Legal team and Field team role changes.
- R27 PASS the contact form rejects missing fields, shows Sending your enquiry while disabled, and shows Your enquiry is received after saving a clearly marked QA record. The error path renders a focused alert; no service failure was induced.
- R28 PASS no speculative FAQ was added.
- R32 PASS links and buttons retain native keyboard behavior, focus has a visible three pixel outline, and the mobile menu has an Escape handler. Mobile keyboard interaction was reviewed in source only.
- R33 PASS UI changes were authored directly with source patches.
- R34 PASS there is no theme toggle with an unimplemented alternate state.
- R35 PASS build, type check and the recorded desktop interactions ran. The framework Link navigation failure found in the first publication was fixed with standard anchors and retested in production.
- R36 R38 PASS the company pages use confirmed capabilities and omit unsupported proof or compliance claims. Product examples remain labeled.
- R37 PASS direction and the confirmed company brand are recorded in corporate-site-design.md.

## Purpose and liveliness gates

- PASS the blue, warm white and mint palette comes from the existing identity; the connected K supplies the motif.
- PASS the typeface and large scale were selected for open letter shapes and the owner's readability request.
- PASS layouts vary between the asymmetric hero, company statement, single featured product, capability rows and implementation sequence.
- PASS motion on the corporate pages is interaction feedback only. The retained product walkthrough changes its demonstration state after a user action.
- PASS no decorative glow, background grid, fake terminal, invented logo bar, pricing tiers or decorative emoji were added to the company site.
- PASS color, layout, typography, spacing and illustration decisions each have a written purpose in corporate-site-design.md.
- PASS functional states and implementation limits are described above rather than presented as tests that did not run.
