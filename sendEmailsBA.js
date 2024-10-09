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
    "name": "Afraan",
    "email": "afraanismail85@gmail.com"
  },
  {
    "name": "Alaa",
    "email": "alaamostafffaa@gmail.com"
  },
  {
    "name": "Venkat Siddani",
    "email": "arjunsiddani@gmail.com"
  },
  {
    "name": "Chhaya",
    "email": "chhayachy618@gmail.com"
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
    "name": "Akshita",
    "email": "khandelwalakshita041@gmail.com"
  },
  {
    "name": "Linda Allen",
    "email": "lin.allen4013@gmail.com"
  },
  {
    "name": "Mikhail",
    "email": "mekhealmagdy213@gmail.com"
  },
  {
    "name": "Mithilesh Bende",
    "email": "mithileshbende777@gmail.com"
  },
  {
    "name": "Mostafa Akesbi",
    "email": "mostafa.akesbi@gmail.com"
  },
  {
    "name": "Muhammad Sajeel Akram Khan",
    "email": "niazisajeel92@gmail.com"
  },
  {
    "name": "Nyeleti Shikwambana",
    "email": "nyeleti649@gmail.com"
  },
  {
    "name": "Wisdom",
    "email": "oghenemarhowisdom@gmail.com"
  },
  {
    "name": "Philip Ojekunle",
    "email": "ojekunlep123@gmail.com"
  },
  {
    "name": "Joshua",
    "email": "oyewalejoshua03@gmail.com"
  },
  {
    "name": "Ravi Kumar",
    "email": "ravikrofficialmail@gmail.com"
  },
  {
    "name": "Shaik Almas",
    "email": "shaikalmas3690@gmail.com"
  },
  {
    "name": "Fatima",
    "email": "twumasifatimab@gmail.com"
  },
  {
    "name": "Wycliffe Adek",
    "email": "wickyadek@gmail.com"
  },
  {
    "name": "Yang-Chun",
    "email": "yangchun329lin@gmail.com"
  },
  {
    "name": "Yonatan",
    "email": "yonatanfikadu450@gmail.com"
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
