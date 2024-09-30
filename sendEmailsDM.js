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

  { "name": "Annel", "email": "anneladwoaakumagyesi@gmail.com" },
  { "name": "Leticia Okyerewa Onoma", "email": "leticiaonoma429@gmail.com" },
  { "name": "Sihle M Maseko", "email": "Mbalienhlepearl337@gmail.com" },
  { "name": "Michael Adekoya", "email": "Michaeladekoya2020@gmail.com" },
  { "name": "Bridget Tendai Muringisi", "email": "muringisib@gmail.com" },
  { "name": "Neha", "email": "nehagodse134@gmail.com" },
  { "name": "Praise", "email": "praisemugano50@gmail.com" },
  { "name": "Sana Albi", "email": "sanaalbi405@gmail.com" },
  { "name": "Sanandita", "email": "sananditadas165@gmail.com" },
  { "name": "Shoa", "email": "shoanwar2910@gmail.com" },
  { "name": "Tshepo Mohono", "email": "tshepomohono@gmail.com" },
  { "name": "Mary Gooding", "email": "Vibespheremarketing247@gmail.com" },
  { "name": "Allan Reuel M", "email": "wetestinitall@gmail.com" }

];

Promise.all(
  recipients.map((recipient) =>
    sendEmailWithAttachment(
      recipient.email,
      `${recipient?.name}, Your Offer Letter from MeriSkill – Access Your Digital Marketing Program!      `,
      "offerLetterMS",
      "toutcheDigitalMarketing",
      { name: recipient.name }
    )
  )
)
  .then(() => console.log("All emails with PDF sent successfully"))
  .catch((error) => console.error("Error sending emails:", error));
