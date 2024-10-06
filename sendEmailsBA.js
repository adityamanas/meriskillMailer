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
    "name": "Abhik Kumar",
    "email": "abhikkumar300@gmail.com"
  },
  {
    "name": "Aniket Gajghate",
    "email": "aniketgajghate41@gmail.com"
  },
  {
    "name": "Anushree",
    "email": "anushree.rajha@gmail.com"
  },
  {
    "name": "David",
    "email": "davidwoju@gmail.com"
  },
  {
    "name": "Muhammad",
    "email": "dawood.analytics@gmail.com"
  },
  {
    "name": "Divya Singh",
    "email": "divyasingh2509@gmail.com"
  },
  {
    "name": "Masoyi Keletuma Mailaya",
    "email": "elitestrader30@gmail.com"
  },
  {
    "name": "Francis",
    "email": "fadarkwah5@gmail.com"
  },
  {
    "name": "Harris",
    "email": "hariteks@yahoo.co.uk"
  },
  {
    "name": "Maryam Id-Hssain",
    "email": "maryam.idhssain2001@gmail.com"
  },
  {
    "name": "Mikhail",
    "email": "mekhealmagdy213@gmail.com"
  },
  {
    "name": "Mostafa",
    "email": "mostafa.akesbi@gmail.com"
  },
  {
    "name": "Mrdul",
    "email": "mrdulgaur@gmail.com"
  },
  {
    "name": "Isaac",
    "email": "obuya.i29@yahoo.com"
  },
  {
    "name": "Oche",
    "email": "ocheabel28@gmail.com"
  },
  {
    "name": "Olufemi",
    "email": "olufemiolawore@gmail.com"
  },
  {
    "name": "Parveen Singh",
    "email": "Psbhandari001@gmail.com"
  },
  {
    "name": "Sadia",
    "email": "sadianowshinporoma@gmail.com"
  },
  {
    "name": "Dura E Shehwar",
    "email": "shehwar292471@gmail.com"
  },
  {
    "name": "Malidevaraju Sushanth Kumar",
    "email": "sushanthraju.2183@gmail.com"
  },
  {
    "name": "Stephanie",
    "email": "swaro749@gmail.com"
  },
  {
    "name": "Muhammad Talha",
    "email": "talhaanwarr6@gmail.com"
  },
  {
    "name": "Vicky Verma",
    "email": "vickyvermaeecd@gmail.com"
  },
  {
    "name": "Vineet",
    "email": "vineettewari.80@gmail.com"
  },
  {
    "name": "Wycliffe Adek",
    "email": "wickyadek@gmail.com"
  },
  {
    "name": "Yetunde",
    "email": "yetunde1403@gmail.com"
  }
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
