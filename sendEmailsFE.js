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
      from: `"MeriSkill" <hello@meriskill.in>"`,


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
    "name": "Vishal Digal",
    "email": "digalbabita013@gmail.com"
  },
  {
    "name": "Festus",
    "email": "festusaadeboye@gmail.com"
  },
  {
    "name": "Tanatswa Mlambo",
    "email": "mlambotanatswa21@gmail.com"
  },
  {
    "name": "Payal",
    "email": "prajapatipayal651@gmail.com"
  },
  {
    "name": "K. Priya Dharshini",
    "email": "priyakanthan2023@gmail.com"
  },
  {
    "name": "Safina Zainab",
    "email": "reachsafina@gmail.com"
  },
  {
    "name": "Rishabh Kumar",
    "email": "rishabhkuamr1748@gmail.com"
  },
  {
    "name": "Samarjit",
    "email": "samarjitmoh@outlook.com"
  },
  {
    "name": "Tapan Deka",
    "email": "td286155@gmail.com"
  },
  {
    "name": "Vinod Singh Patel",
    "email": "vinodsinghpatel2630@gmail.com"
  },
  {
    "name": "Xoliswa",
    "email": "xlswmafutha@gmail.com"
  },
  {
    "name": "Boutayna",
    "email": "zakariboutayna02@gmail.com"
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
