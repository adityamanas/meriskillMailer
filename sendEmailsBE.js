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
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true,
      auth: {
        user: "no-reply@meriskill.com",
        pass: "meriskill@cohi24",
      },
    });

    const pdfFileName = `${data.name}_offerLetter.pdf`;

    const mailOptions = {
      from: "no-reply@meriskill.com",


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
  { "name": "Debojit", "email": "debojitchoudhury117@gmail.com" },
  { "name": "Mahesh Jadhav", "email": "maheshjadhav92229@gmail.com" },
  { "name": "Fanou Noudehouenou Freddy", "email": "noudehouenoufr@gmail.com" },
  { "name": "Sboniso", "email": "sbonisozama0@gmail.com" },
  { "name": "Om Prakash Chai", "email": "softtech2077@gmail.com" },
  { "name": "Ranga Jyothika Vijaya Sravya", "email": "21501a12a4@pvpsit.ac.in" },
  { "name": "David Segun", "email": "segdavid03@gmail.com" },
  { "name": "Raghad", "email": "raghaduni1004@gmail.com" },
  { "name": "Vedant", "email": "Rangomalepapa@gmail.com" },
  { "name": "Asharamia", "email": "ajohnson5473@gmail.com" },
  { "name": "Akash Jadhav", "email": "akashjadhav7040253178@gmail.com" },
  { "name": "Hunain", "email": "hunainasif2004@gmail.com" }

];

Promise.all(
  recipients.map((recipient) =>
    sendEmailWithAttachment(
      recipient.email,
      `${recipient?.name}, Your Offer Letter from MeriSkill – Access Your Backend Program!      `,
      "offerLetterMS",
      "scrapmycarBE",
      { name: recipient.name }
    )
  )
)
  .then(() => console.log("All emails with PDF sent successfully"))
  .catch((error) => console.error("Error sending emails:", error));
