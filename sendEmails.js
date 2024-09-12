const express = require("express");

const ejs = require("ejs");
const fs = require("fs/promises");
const path = require("path");
const puppeteer = require("puppeteer");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

async function generatePDF(htmlContent) {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.setContent(htmlContent);

    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    return pdfBuffer;
  } catch (error) {
    throw error;
  }
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/send-offer", async (req, res) => {
  try {
    const { email, name } = req.body;

    // Compile the PDF template with data
    const pdfTemplatePath = path.join(
      __dirname,
      "templates",
      "pdfTemplate.ejs"
    );
    const pdfTemplateContent = await fs.readFile(pdfTemplatePath, "utf-8");
    const compiledPdfTemplate = ejs.compile(pdfTemplateContent)({ name });

    const pdfBuffer = await generatePDF(compiledPdfTemplate);

    // await sendEmailWithAttachment(
    //   email,
    //   "Job Offer",
    //   "offerLetter",
    //   pdfBuffer,
    //   { name }
    // );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${name}_offerLetter.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating and sending offer letter:", error);
    res
      .status(500)
      .send("An error occurred while processing the offer letter.");
  }
});

app.listen(5500, () => {
  console.log("Server started on port 5500");
});
