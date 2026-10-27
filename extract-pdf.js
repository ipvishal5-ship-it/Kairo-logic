const fs = require("fs");
const path = require("path");

// pdf-parse exports a single default function that takes a Buffer/Uint8Array
const pdfParse = require("pdf-parse");

const files = [
  path.join(__dirname, "..", "ARMS_Data_Security_8_Main_Slides.pdf"),
  path.join(__dirname, "..", "SARFAESI Intelligence Software.pdf"),
  path.join(__dirname, "..", "SARFAESI_Intelligence_Security_Slides.pdf"),
];

(async () => {
  for (const f of files) {
    const name = f.split(/[\\/]/).pop();
    console.log(`\n===== ${name} =====`);
    try {
      const data = fs.readFileSync(f);
      const result = await pdfParse(data);
      console.log(`Pages: ${result.numpages}`);
      console.log(`Text length: ${result.text.length} chars`);
      console.log(`\n--- Full text ---\n`);
      console.log(result.text);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
})();
