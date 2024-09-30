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
  { "name": "Abhishek Sangam", "email": "abhisheksangam46@gmail.com" },
  { "name": "Anitha Durai", "email": "anithatheru@gmail.com" },
  { "name": "Arpita Gupta", "email": "arpita03gupta05@gmail.com" },
  { "name": "Arpita Gupta", "email": "arpitagupta3500@gmail.com" },
  { "name": "Aya", "email": "ayabenhamri40@gmail.com" },
  { "name": "Abisola", "email": "bisola287@gmail.com" },
  { "name": "Blessing Iwerumor", "email": "blessnko@gmail.com" },
  { "name": "Raymond", "email": "etchumac@gmail.com" },
  { "name": "Yash", "email": "godboleyash1@gmail.com" },
  { "name": "Muhammad Husnain Shahid", "email": "husnainshahid451@gmail.com" },
  { "name": "Mejd", "email": "Jerbimejd39@gmail.com" },
  { "name": "Juliana John", "email": "julianajohn0128@gmail.com" },
  { "name": "David Oluwatomisin Oluwatayo", "email": "odavidoluwatayo@gmail.com" },
  { "name": "Roseline", "email": "ojomaalfa.roa@gmail.com" },
  { "name": "Oladun", "email": "Oladun60@gmail.com" },
  { "name": "Selby Masemola", "email": "onlinestudies45@gmail.com" },
  { "name": "Bolanle", "email": "Oyebolabolanle1@gmail.com" },
  { "name": "Prishita", "email": "prishita.parmar@klecbalc.edu.in" },
  { "name": "Raza Lakho", "email": "razalakhani@yahoo.com" },
  { "name": "Krishna Chodha", "email": "rickwalker010@gmail.com" },
  { "name": "Rukayat", "email": "rukayatodunola114@gmail.com" },
  { "name": "Rosemary", "email": "rwangeci8@gmail.com" },
  { "name": "Shinde Utkarsha Namdevrao", "email": "shindeutkarsha1000@gmail.com" },
  { "name": "Simboro Rydouane", "email": "simbororydouane2001@gmail.com" },
  { "name": "Sarfraz Nawaz", "email": "ssnawaz1471@gmail.com" },
  { "name": "Temitope", "email": "topethompson2019@gmail.com" },
  { "name": "Mithilesh V", "email": "vmithilesh2003@gmail.com" }
];

Promise.all(
  recipients.map((recipient) =>
    sendEmailWithAttachment(
      recipient.email,
      `${recipient?.name}, Your Offer Letter from MeriSkill – Access Your Business Analyst Program!      `,
      "offerLetterMS",
      "plateueBusiness",
      { name: recipient.name }
    )
  )
)
  .then(() => console.log("All emails with PDF sent successfully"))
  .catch((error) => console.error("Error sending emails:", error));
