# Kairologic visual refresh

The existing midnight navy, blue and teal palette is retained. The site now leads with secured-asset photography, followed by a connected-record diagram, a seven-stage interactive case journey, a readable portfolio dashboard and a field-team story. Copy is shorter, with fewer repeated cards and decorative icons.

## Review interactions

- Toggle the scattered/connected case-information illustration.
- Select each case stage; the explanation, document and next action update together.
- Switch Bank/ARC sample portfolios; counts, bars, closure ring and trend update together.
- Select a pipeline bar to see the corresponding sample next action.
- Select Field team, Legal team or Management to explore role-specific context.
- Check mobile navigation, visible focus, arrow/Home/End tab controls and reduced motion.

All case details, chart values and photographs are illustrative. The page is a marketing demonstration, with no connection to production case records. Request a demo uses the existing telephone contact.

## Generated images

Images were generated using the built-in image-generation tool, then converted to WebP for the website. They are illustrative scenes, not photographs of actual client properties or staff.

- `public/images/hero-industrial-estate.webp`: hero scene and case workspace thumbnail.
- `public/images/field-inspection.webp`: field-team section.

### Hero prompt

Use case: photorealistic-natural. Create one photorealistic panoramic website hero photograph, 16:9 wide. Aerial drone view of a modern industrial estate in Mumbai, India at blue hour, contemporary warehouses and glass-and-steel industrial buildings with a few realistic trucks, distant Mumbai urban skyline. Premium enterprise financial technology photography. Deep midnight navy sky and shadows, restrained electric blue and teal warehouse lighting, natural subtle amber interior lights. Cinematic architectural photography, real weathered concrete and metal textures, strong realistic perspective, credible scale, no futuristic sci-fi objects, no glossy CGI. Architectural mass concentrated middle and right, darker quieter sky at upper left. Crisp details and natural light separation so buildings remain visible on dark website. No words, no logos, no charts, no interface overlays, no watermarks. The asset will visually anchor a SARFAESI secured-asset case management brand, not advertise a specific real property.

### Field image prompt

Use case photorealistic-natural. Website editorial image for an Indian enterprise property case management technology brand. A professional Indian male field officer aged around 35 wearing a pale blue cotton shirt standing outside a modern industrial warehouse in Mumbai, inspecting the property and photographing its facade with a smartphone held naturally in both hands. Shoot over his right shoulder so his hands and the phone are visible at the lower right and the real industrial warehouse fills most of the frame. Wide landscape 3:2 composition. Premium documentary photography with realistic concrete, steel, palms in distance, natural late afternoon blue-hour light, navy and restrained teal color grade harmonious with a dark navy website. Physically accurate hands and ordinary realistic phone, no large floating graphics. Phone display only a small natural camera view without readable text. Calm, credible, human, sophisticated, not posed stock photo. No logos, words, signage, watermark, sci-fi holograms, or artificial glow.

## Build

`npm run build` builds the usual Next.js application.

`node scripts/export-static.mjs` optionally creates `out/` for static review/hosting. This sets `KAIRO_STATIC_EXPORT=1` only for its child build; normal Next.js hosting behavior is unchanged.
