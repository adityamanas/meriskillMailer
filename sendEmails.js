const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs/promises");
const path = require("path");
const { promisify } = require("util");
const puppeteer = require("puppeteer");

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

async function sendEmailWithAttachment(
  to,
  subject,
  emailTemplate,
  pdfTemplate,
  data
) {
  try {
    const emailTemplatePath = path.join(
      __dirname,
      "templates",
      `${emailTemplate}.ejs`
    );
    const emailTemplateContent = await fs.readFile(emailTemplatePath, "utf-8");
    const compiledEmailTemplate = ejs.compile(emailTemplateContent)(data);

    const pdfTemplatePath = path.join(
      __dirname,
      "templates",
      `${pdfTemplate}.ejs`
    );
    const pdfTemplateContent = await fs.readFile(pdfTemplatePath, "utf-8");
    const compiledPdfTemplate = ejs.compile(pdfTemplateContent)(data);

    const pdfBuffer = await generatePDF(compiledPdfTemplate);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hrtechcertifysolution@gmail.com",
        pass: "jerhrfxedbegowav",
      },
    });

    const pdfFileName = `${data.name}_offerLetter.pdf`;

    const mailOptions = {
      from: "hrtechcertifysolution@gmail.com",
      to,
      subject,
      html: compiledEmailTemplate,
      attachments: [
        {
          filename: pdfFileName,
          content: pdfBuffer,
          encoding: "base64",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

const recipients = [
  // { name: 'Avinash Pandey', email: 'avinashpandey2492002@gmail.com' },
  // { name: 'Lakshay Dhoundiyal', email: 'lakshay22dhoundiyal@gmail.com' },
  // { name: 'Aditya Shrivastav', email: 'adityashrivastav567856@gmail.com' },
  // { name: 'Shivani Rana', email: 'shivanirana417@gmail.com' },
  // { name: 'Sanjana Sahani', email: 'sahani.sanjana06@gmail.com' },
  // { name: 'Shakti Singh Rathaur', email: 'ssrrathaur068@gmail.com' },
  // { name: 'Prachi Jaiswal', email: 'prachijaiswal438@gmail.com' },
  // { name: 'Esha Jamwal', email: 'eshaj12345@gmail.com' },
  // { name: 'Chirag Singhal', email: 'chiragsinghal8810@gmail.com' },
  // { name: 'Afolabi Olajumoke Idowu', email: 'afolabiadeolaolajumoke@gmail.com' },
  { name: 'Saransh Dwivedi', email: 'dwivedisaransh6@gmail.com' },
  { name: 'Asad Abbas', email: 'asadabbas4338@gmail.com' },
  { name: 'Chitranshi Srivastava', email: 'kalpana8765921869@gmail.com' },
  { name: 'Anushka Sonker', email: 'anushkasonker916@gmail.com' }
];

Promise.all(
  recipients.map((recipient) =>
    sendEmailWithAttachment(
      recipient.email,
      "Job Offer",
      "offerLetter",
      // "frontend",
      // "pdfTemplate",
      "frontendcopy",
      { name: recipient.name }
    )
  )
)
  .then(() => console.log("All emails with PDF sent successfully"))
  .catch((error) => console.error("Error sending emails:", error));
