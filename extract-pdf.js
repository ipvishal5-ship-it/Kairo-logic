const fs = require("fs");
const { PDFParse } = require("pdf-parse");

const files = [
  "C:\\Users\\ipvis\\Downloads\\kiro technology\\ARMS_Data_Security_8_Main_Slides.pdf",
];

(async () => {
  for (const f of files) {
    console.log(`\n===== ${f.split("\\").pop()} =====`);
    try {
      const uint8 = new Uint8Array(fs.readFileSync(f));
      const parser = new PDFParse(uint8);
      await parser.load();
      const result = await parser.getText();
      console.log(`Pages: ${result.pages.length}`);
      for (const page of result.pages) {
        console.log(`\n--- Page ${page.num} ---`);
        console.log(page.text);
      }
      parser.destroy();
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
})();
