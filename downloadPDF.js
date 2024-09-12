const express = require("express");
const ejs = require("ejs");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");
const puppeteer = require("puppeteer");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use(cors());
// Helper function to generate the PDF
async function generatePDF(htmlContent) {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent);

    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();
    return pdfBuffer;
  } catch (error) {
    throw new Error("Error generating PDF: " + error.message);
  }
}

// Centralized function to handle PDF generation and response
async function handlePDFRequest(res, name, templateFilePath) {
  try {
    // Read the template file
    const pdfTemplateContent = await fs.readFile(templateFilePath, "utf-8");
    const compiledPdfTemplate = ejs.compile(pdfTemplateContent)({ name });
    const pdfBuffer = await generatePDF(compiledPdfTemplate);

    // Set headers to prompt file download in the client
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${name}_offerLetter.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");

    // Send the PDF file for download
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating or sending PDF:", error);
    res
      .status(500)
      .send("An error occurred while generating the offer letter.");
  }
}

// Template mapping
const templatePaths = {
  Ai: "templates/toutcAiEngineer.ejs",
  DA: "templates/podhaDaWelcome.ejs",
  DM: "templates/toutcheDigitalMarketing.ejs",
  BA: "templates/plateueBusiness.ejs",
  MA: "templates/microLabsMarketing.ejs",
};

// Dynamic route handler for generating PDFs
app.post("/generate-offer/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const { name } = req.body;

    // Ensure the name is provided in the request body
    if (!name) {
      return res.status(400).send("Name is required to generate the PDF.");
    }

    // Check if the requested type exists in the template paths
    const templateFilePath = templatePaths[type];
    if (!templateFilePath) {
      return res
        .status(400)
        .send("Invalid type. Please use a valid offer type.");
    }

    // Handle the PDF generation
    await handlePDFRequest(res, name, path.join(__dirname, templateFilePath));
  } catch (error) {
    console.error("Error handling PDF generation request:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});
app.listen(5500, () => {
  console.log("Server Downlad started on port 5500");
});
