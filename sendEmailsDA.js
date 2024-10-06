const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs/promises");
const path = require("path");
const { promisify } = require("util");
const puppeteer = require("puppeteer");
process.setMaxListeners(1000);
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
    "name": "Aarzoo Sagar",
    "email": "aarzoosagar515@gmail.com"
  },
  {
    "name": "Abhishek",
    "email": "abhisheksoni8068@gmail.com"
  },
  {
    "name": "Nwanevu Adaugo Gift",
    "email": "adaugonwanevugift@gmail.com"
  },
  {
    "name": "Dalia Adel",
    "email": "adeldalia048@gmail.com"
  },
  {
    "name": "Boluwatife",
    "email": "aderemiboluwatife9@gmail.com"
  },
  {
    "name": "Manoj",
    "email": "aditisharma879126@gmail.com"
  },
  {
    "name": "Aditya",
    "email": "adityapatil8500@gmail.com"
  },
  {
    "name": "Adnan Shah",
    "email": "adnannazeershah@gmail.com"
  },
  {
    "name": "Agisha",
    "email": "agishagirish234@gmail.com"
  },
  {
    "name": "Ahmed Tarek",
    "email": "ahmedtarek9998886@gmail.com"
  },
  {
    "name": "Akbar",
    "email": "akbarkhan9879608906@gmail.com"
  },
  {
    "name": "Akhila",
    "email": "akhilapv333@gmail.com"
  },
  {
    "name": "Akintunde Ayangbemi",
    "email": "Akingbemi2015@gmail.com"
  },
  {
    "name": "Mohammad Ali Raza",
    "email": "alisolat900@gmail.com"
  },
  {
    "name": "Allan",
    "email": "allangachomo8@gmail.com"
  },
  {
    "name": "Aly Asaad",
    "email": "alyasaad2003@gmail.com"
  },
  {
    "name": "Aman",
    "email": "amankamte9594@gmail.com"
  },
  {
    "name": "Amina Anwar",
    "email": "aminaanwar607@gmail.com"
  },
  {
    "name": "Amisha",
    "email": "amishakumari2705@gmail.com"
  },
  {
    "name": "Amrendra",
    "email": "amrendra2091@gmail.com"
  },
  {
    "name": "Faith",
    "email": "anochrionyefaithchioma@gmail.com"
  },
  {
    "name": "Anum",
    "email": "anumalmas@hotmail.com"
  },
  {
    "name": "Archibong",
    "email": "archibongeyo29@gmail.com"
  },
  {
    "name": "Venkat Siddani",
    "email": "arjun1974@gmail.com"
  },
  {
    "name": "Taiye",
    "email": "arokoyut@gmail.com"
  },
  {
    "name": "Naana",
    "email": "asamoahnaana2@gmail.com"
  },
  {
    "name": "Ashutosh Sharma",
    "email": "ashutoshsharma380@gmail.com"
  },
  {
    "name": "Atiqa Tabbasum",
    "email": "atiqatabbasum0@gmail.com"
  },
  {
    "name": "Aires Manuel",
    "email": "ayres.g.s@gmail.com"
  },
  {
    "name": "Bappy Kumar",
    "email": "bappyku95@gmail.com"
  },
  {
    "name": "Waseer Alam",
    "email": "basheeriqrar@gmail.com"
  },
  {
    "name": "Berlinda",
    "email": "berlana.d@gmail.com"
  },
  {
    "name": "Bhimana Kishan",
    "email": "bhimanakishan@gmail.com"
  },
  {
    "name": "Meron",
    "email": "bzmmb@yahoo.com"
  },
  {
    "name": "Aniket Chakraborty",
    "email": "chakrabortyaniket410@gmail.com"
  },
  {
    "name": "Cikizwa",
    "email": "cikiMatomane@gmail.com"
  },
  {
    "name": "Olalekan",
    "email": "Craigdele01@gmail.com"
  },
  {
    "name": "Darshini Nadar",
    "email": "darshininadar0914@gmail.com"
  },
  {
    "name": "Dalia",
    "email": "datef603@gmail.com"
  },
  {
    "name": "David",
    "email": "davidohio73@gmail.com"
  },
  {
    "name": "Adedamola",
    "email": "dedamola007@gmail.com"
  },
  {
    "name": "Destiny Efedue",
    "email": "destinyefedue@gmail.com"
  },
  {
    "name": "Doha Ahmad",
    "email": "doha.hafez5@gmail.com"
  },
  {
    "name": "Doris Ugochi Nwauwa",
    "email": "doris_nwauwa@yahoomail.com"
  },
  {
    "name": "Edwin",
    "email": "edwinifaka1987@gmail.com"
  },
  {
    "name": "Maryam",
    "email": "elmouim.maryam@gmail.com"
  },
  {
    "name": "Nneoma Eze",
    "email": "ezenneomachidinma@gmail.com"
  },
  {
    "name": "Fagbemi",
    "email": "fagbemiphilip@gmail.com"
  },
  {
    "name": "Febin Abdul Razack",
    "email": "febinnoushu@gmail.com"
  },
  {
    "name": "Jennifer Festus",
    "email": "festusjennie@gmail.com"
  },
  {
    "name": "Jeremiah Folorunsho",
    "email": "folorunshojv@gmail.com"
  },
  {
    "name": "Favour",
    "email": "fulonna@gmail.com"
  },
  {
    "name": "Gangadhar Rautray",
    "email": "gangadharrautraya97@gmail.com"
  },
  {
    "name": "Geetanjali Joshi",
    "email": "geetanjalijoshi1202@gmail.com"
  },
  {
    "name": "Glory",
    "email": "gloryto25@gmail.com"
  },
  {
    "name": "Gopichand",
    "email": "gopichandchalla516@gmail.com"
  },
  {
    "name": "Hajar",
    "email": "Hajarkoudoussi@gmail.vom"
  },
  {
    "name": "Harveen Kaur Sandhu",
    "email": "harveenkaur254@gmail.com"
  },
  {
    "name": "Muhammad Haseeb",
    "email": "haseebaslam856@gmail.com"
  },
  {
    "name": "Olayimika",
    "email": "heritageolayimika@gmail.com"
  },
  {
    "name": "Himanshu Dhasmana",
    "email": "himanshudhasmana0@gmail.com"
  },
  {
    "name": "Hiren Bhavani",
    "email": "Hirenbhavani@gmail.com"
  },
  {
    "name": "Hegde Pavan",
    "email": "hpavan1955@gmail.com"
  },
  {
    "name": "Amina",
    "email": "ibrahimamina24@gmail.com"
  },
  {
    "name": "Udofia Idarabong",
    "email": "idarafavour9@gmail.com"
  },
  {
    "name": "Fatema",
    "email": "imani.fatima@gmail.com"
  },
  {
    "name": "Rim",
    "email": "jamlirim94dataanalyst@gmail.com"
  },
  {
    "name": "Jaya Pradeepa M",
    "email": "jayapradeepa2004@gmail.com"
  },
  {
    "name": "Jayaraman R",
    "email": "jayaramanrj17@gmail.com"
  },
  {
    "name": "Jestin",
    "email": "jestin.v.shaji@gmail.com"
  },
  {
    "name": "Juliet",
    "email": "julietoluchi13@gmail.com"
  },
  {
    "name": "Kajal Chaurasia",
    "email": "kajalchaurasia2601@gmail.com"
  },
  {
    "name": "Gurmeet Kaur",
    "email": "kaurgurmeet2905@gmail.com"
  },
  {
    "name": "Kay",
    "email": "kaybenjamindaniels22@gmail.com"
  },
  {
    "name": "Kehinde",
    "email": "Kehindeibrahim8@gmail.com"
  },
  {
    "name": "Kehinde",
    "email": "kehindeiyanu750@gmail.com"
  },
  {
    "name": "Kumar Keshav",
    "email": "keshavkumar0332@gmail.com"
  },
  {
    "name": "Lalitha",
    "email": "lalithakannan998@gmail.com"
  },
  {
    "name": "Tosin",
    "email": "lanreatowobola7@gmail.com"
  },
  {
    "name": "Yasmine",
    "email": "lilahchadi@gmail.com"
  },
  {
    "name": "Linda",
    "email": "lindaraliugye2@gmail.com"
  },
  {
    "name": "Lovepreet Singh",
    "email": "lovepreetsingh29210@gmail.com"
  },
  {
    "name": "Maanas S K",
    "email": "maanasrao06@gmail.com"
  },
  {
    "name": "Madhuri Patil",
    "email": "madhuripatil159@gmail.com"
  },
  {
    "name": "Aditya Malik",
    "email": "malikaditya0404@gmail.com"
  },
  {
    "name": "Manish Sharma",
    "email": "manishsharma0025@gmail.com"
  },
  {
    "name": "Abdul",
    "email": "marwaliabdul57@gmail.com"
  },
  {
    "name": "Arogyavani",
    "email": "mdaroghyavani2039@gmail.com"
  },
  {
    "name": "Medha Roy",
    "email": "medharoy5257@gmail.com"
  },
  {
    "name": "Adewunmi Modupe",
    "email": "modupeadewunmi8@gmail.com"
  },
  {
    "name": "Modi Utsav",
    "email": "modiutsav049@gmail.com"
  },
  {
    "name": "Mohamed",
    "email": "mohamedvmaniyan@gmail.com"
  },
  {
    "name": "Mohtasim Hussain",
    "email": "mohtasimhussain88@gmail.com"
  },
  {
    "name": "Shubham",
    "email": "more.shubham2044@gmail.com"
  },
  {
    "name": "Farhat Jahan",
    "email": "mouniafarhatjahan@gmail.com"
  },
  {
    "name": "Moushmi Jha",
    "email": "moushmijha95@gmail.com"
  },
  {
    "name": "Muhammad Siddiqui",
    "email": "msiddiqui191109@gmail.com"
  },
  {
    "name": "Muhammad",
    "email": "muhammadibrheeeemshah@gmail.com"
  },
  {
    "name": "Ayodele Murphy",
    "email": "murphyayodele30@gmail.com"
  },
  {
    "name": "Namrata",
    "email": "namrata1215patil@gmail.com"
  },
  {
    "name": "Naomi",
    "email": "naomiokonkwo35@gmail.com"
  },
  {
    "name": "Natasha",
    "email": "natashaprasad2117@gmail.com"
  },
  {
    "name": "Navjot Singh",
    "email": "navjotsingh94821@gmail.com"
  },
  {
    "name": "Ayodeji",
    "email": "nbadebayo@yahoo.com"
  },
  {
    "name": "Neha Kumari",
    "email": "nehasingh7054@gmail.com"
  },
  {
    "name": "Patience",
    "email": "nelsonp706@gmail.com"
  }
];

Promise.all(
  recipients.map((recipient) =>
    sendEmailWithAttachment(
      recipient.email,
      `${recipient?.name}, Your Offer Letter from MeriSkill – Access Your Data Analyst Program!      `,
      "offerLetterMS",
      "podhaDaWelcome",
      { name: recipient.name }
    )
  )
)
  .then(() => console.log("All emails with PDF sent successfully"))
  .catch((error) => console.error("Error sending emails:", error));
