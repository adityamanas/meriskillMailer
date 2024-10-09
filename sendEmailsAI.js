const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs/promises");
const path = require("path");
const { promisify } = require("util");
const puppeteer = require("puppeteer");
process.setMaxListeners(100);

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
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "hello@meriskill.in",
        pass: "Meriskill@cohi24",
      },
    });

    const pdfFileName = `${data.name}_offerLetter.pdf`;

    const mailOptions = {
      from: `"MeriSkill Support" <hello@meriskill.in>"`,


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
    "name": "Asmae",
    "email": "asmaezzahyy@gmail.com"
  },
  {
    "name": "Edrin",
    "email": "edrin24thomas@gmail.com"
  },
  {
    "name": "Muhammad Ansar",
    "email": "engr.mianansar24@gmail.com"
  },
  {
    "name": "Kunal",
    "email": "Kunalchinche1997@gmail.com"
  },
  {
    "name": "Abdullah Qazi",
    "email": "qabdullah513@gmail.com"
  },
  {
    "name": "Ravi Sharma",
    "email": "ravi.sharma9230@gmail.com"
  },
  {
    "name": "Robin K Philip",
    "email": "robinkphilipp8018@gmail.com"
  },
  {
    "name": "Masna Shivaram",
    "email": "shivanetha2299@gmail.com"
  },
  {
    "name": "Suksham",
    "email": "suksham8371@gmail.com"
  },
  {
    "name": "Uba Chinyere",
    "email": "theresachinyere102@gmail.com"
  },
  {
    "name": "Vijeta",
    "email": "vijeta.mum.dbda@gmail.com"
  },
  {
    "name": "Waleed Akram",
    "email": "waleedakram035@gmail.com"
  }
];

Promise.all(
  recipients.map((recipient) =>
    sendEmailWithAttachment(
      recipient.email,
      `${recipient?.name}, Your Offer Letter from MeriSkill – Access Your AI Developer Program!      `,
      "offerLetterMS",
      "toutcAiEngineer",
      { name: recipient.name }
    )
  )
)
  .then(() => console.log("All emails with PDF sent successfully"))
  .catch((error) => console.error("Error sending emails:", error));
