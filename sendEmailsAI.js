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
    "name": "Keerthana",
    "email": "124150021@sastra.ac.in"
  },
  {
    "name": "Keerthana",
    "email": "aditya.manas01@gmail.com"
  },
  {
    "name": "Amiya Ranjan Nayak",
    "email": "amiyaranjannayak37@gmail.com"
  },
  {
    "name": "Asmae",
    "email": "asmaezzahyy@gmail.com"
  },
  {
    "name": "Kiran Dalmiya",
    "email": "dalmiyakiran@gmail.com"
  },
  {
    "name": "Devanshu",
    "email": "devanshud.aiml22@sbjit.edu.in"
  },
  {
    "name": "Drishti",
    "email": "drishtirajput9024@gmail.com"
  },
  {
    "name": "Edrin",
    "email": "edrin24thomas@gmail.com"
  },
  {
    "name": "Fada Fazin",
    "email": "Fadafazin0@gmail.com"
  },
  {
    "name": "Habib",
    "email": "hab_sh@yahoo.com"
  },
  {
    "name": "Hania",
    "email": "haniakhaled91@gmail.com"
  },
  {
    "name": "Hamza Ahmed Khan Sundu",
    "email": "hzahmed23@gmail.com"
  },
  {
    "name": "Murtaza",
    "email": "Murtazamanzoor2801@gmail.com"
  },
  {
    "name": "Panashe",
    "email": "panashewhispermatarutse@hotmail.com"
  },
  {
    "name": "Rahmad Hidayad",
    "email": "rhmad.yayat102@gmail.com"
  },
  {
    "name": "Robin K Philip",
    "email": "robinkphilipp8018@gmail.com"
  },
  {
    "name": "Juhi",
    "email": "saxenajuhi111@gmail.com"
  },
  {
    "name": "Sesugh Agbadu",
    "email": "sesughagbadu@yahoo.com"
  },
  {
    "name": "Sharvesh Vishnu K",
    "email": "sharveshvishnu00@gmail.com"
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
    "name": "Muhammad Talha",
    "email": "talhaanwarr@proton.me"
  },
  {
    "name": "Vijeta",
    "email": "vijeta.mum.dbda@gmail.com"
  },
  {
    "name": "Waleed Akram",
    "email": "waleedakram035@gmail.com"
  },
  {
    "name": "Muhammad Yousuf Shaikh",
    "email": "yosuufshaikh3883@gmail.com"
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
