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

  {
    "name": "Ahmed",
    "email": "ahmedsann22@gmail.com"
  },
  {
    "name": "Bishal",
    "email": "aryalbishal9876@gmail.com"
  },
  {
    "name": "Aulona",
    "email": "aulonaxhabli@gmail.com"
  },
  {
    "name": "Muhammad Hassan Akhtar",
    "email": "chwdryhassan@gmail.com"
  },
  {
    "name": "Gowtham",
    "email": "gowthamsurya411@gmail.com"
  },
  {
    "name": "Hardik Maheshwari",
    "email": "hardikmaheshwari828@gmail.com"
  },
  {
    "name": "Lorraine",
    "email": "lorrainemwoy@gmail.com"
  },
  {
    "name": "Blessing",
    "email": "okorieblessing.ogbonnaya@gmail.com"
  },
  {
    "name": "Shubham Chauhan",
    "email": "shubhamchauhanpoly@gmail.com"
  },
  {
    "name": "Unnati Pal",
    "email": "unnnatipal@gmail.com"
  }


];

Promise.all(
  recipients.map((recipient) =>
    sendEmailWithAttachment(
      recipient.email,
      `${recipient?.name}, Your Offer Letter from MeriSkill – Access Your Digital Marketing Program!      `,
      "offerLetterMS",
      "prksFE",
      { name: recipient.name }
    )
  )
)
  .then(() => console.log("All emails with PDF sent successfully"))
  .catch((error) => console.error("Error sending emails:", error));
