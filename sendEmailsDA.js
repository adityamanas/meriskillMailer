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
    "name": "Abdullah Khan",
    "email": "abdullah23khann@gmail.com"
  },
  {
    "name": "Abdulateef",
    "email": "abdulrahman.abolaji@gmail.com"
  },
  {
    "name": "Adewale",
    "email": "adewale.ilesanmi001@gmail.com"
  },
  {
    "name": "Aminat",
    "email": "adewaleameealnah1@gmail.con"
  },
  {
    "name": "Manoj",
    "email": "aditisharma879126@gmail.com"
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
    "name": "Aisha",
    "email": "aishagama479@gmail.com"
  },
  {
    "name": "Akhila",
    "email": "akhilapv333@gmail.com"
  },
  {
    "name": "Akhilesh",
    "email": "akhilesh.bhaskar@gmail.com"
  },
  {
    "name": "Akintunde Ayangbemi",
    "email": "Akingbemi2015@gmail.com"
  },
  {
    "name": "Aliyah Zahratu Rizqi",
    "email": "aliyazahr@gmail.com"
  },
  {
    "name": "Amal G",
    "email": "amalgopi2015@gmail.com"
  },
  {
    "name": "Amina Anwar",
    "email": "aminaanwar607@gmail.com"
  },
  {
    "name": "Amrendra",
    "email": "amrendra2091@gmail.com"
  },
  {
    "name": "Anjali",
    "email": "anjalitalan5858@gmail.com"
  },
  {
    "name": "Ankush",
    "email": "ankushceeng@gmail.com"
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
    "name": "Ashri Das",
    "email": "ashri5684@gmail.com"
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
    "name": "Joshua Bassey",
    "email": "baaseyj78@gmail.com"
  },
  {
    "name": "Rana Ben Fraj",
    "email": "benfraj.rana@gmail.com"
  },
  {
    "name": "Bhimana Kishan",
    "email": "bhimanakishan@gmail.com"
  },
  {
    "name": "Biswajit",
    "email": "biswajitgiri80446@gmail.com"
  },
  {
    "name": "Ruchitha",
    "email": "bommarapuruchitha@gmail.com"
  },
  {
    "name": "Aniket Chakraborty",
    "email": "chakrabortyaniket410@gmail.com"
  },
  {
    "name": "Ayodele",
    "email": "chimundadele@gmail.com"
  },
  {
    "name": "Chinedu Nwakanma",
    "email": "chinedunwakanma90@gmail.com"
  },
  {
    "name": "Dan",
    "email": "danlary308@gmail.com"
  },
  {
    "name": "David",
    "email": "davidohio73@gmail.com"
  },
  {
    "name": "Deepak Sharma",
    "email": "deepaksharma6168d@gmail.com"
  },
  {
    "name": "Dulkebe",
    "email": "dimasdamale@gmail.com"
  },
  {
    "name": "Divyanshu Singh",
    "email": "divyanshusingh1497@gmail.com"
  },
  {
    "name": "Drashti",
    "email": "drashtibhavsar01@gmail.com"
  },
  {
    "name": "Nancy",
    "email": "Eigbiluesenancy@gmail.com"
  },
  {
    "name": "Maryam",
    "email": "elmouim.maryam@gmail.com"
  },
  {
    "name": "Godwin Albert",
    "email": "eromose4@gmail.com"
  },
  {
    "name": "Laila",
    "email": "ettaqylaila@gmail.com"
  },
  {
    "name": "Fagbemi",
    "email": "fagbemiphilip@gmail.com"
  },
  {
    "name": "Ogbogoh Faithful I Feanyi",
    "email": "faithfulogbogoh.data@gmail.com"
  },
  {
    "name": "Aleksandr Fomichev",
    "email": "fomichev.a.d@gmail.com"
  },
  {
    "name": "Favour",
    "email": "fulonna@gmail.com"
  },
  {
    "name": "Sravani",
    "email": "gangulasravani97@gmail.com"
  },
  {
    "name": "Ghizlane",
    "email": "ghizlaneen200@gmail.com"
  },
  {
    "name": "Happiness Abasiodion Simeon",
    "email": "hsimeon16@gmail.com"
  },
  {
    "name": "Harika LV",
    "email": "harika.lv07@gmail.com"
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
    "name": "Hauwa Alkasim Yahaya",
    "email": "hauwaalkasim1994@gmail.com"
  },
  {
    "name": "Olayimika",
    "email": "heritageolayimika@gmail.com"
  },
  {
    "name": "Ibrahim Oyere",
    "email": "ibotech34@gmail.com"
  },
  {
    "name": "Ibrahim",
    "email": "Ibrahemabdelgawad97@gmail.com"
  },
  {
    "name": "Quazim Rashidat Idris",
    "email": "idrisrashidatbola123@outlook.com"
  },
  {
    "name": "Kabir Musa Adam",
    "email": "inene2014.kma@gmail.com"
  },
  {
    "name": "Irawati",
    "email": "irareds136@gmail.com"
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
    "name": "John",
    "email": "johnpreach@gmail.com"
  },
  {
    "name": "Juliet",
    "email": "julietoluchi13@gmail.com"
  },
  {
    "name": "Jitisha",
    "email": "jwork202277@gmail.com"
  },
  {
    "name": "Karima Kaci",
    "email": "kacikarima2000@gmail.com"
  },
  {
    "name": "Kanak Pal",
    "email": "kanakba1999@gmail.com"
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
    "name": "Kelebogile Motlalepula",
    "email": "kelebogilemotlalepula07@gmail.com"
  },
  {
    "name": "Khadija",
    "email": "khadijasheikh085@gmail.com"
  },
  {
    "name": "Himabindu",
    "email": "koochanahimabindu04@gmail.com"
  },
  {
    "name": "Kristopher",
    "email": "ksummers19@uschool.org"
  },
  {
    "name": "Kwoba",
    "email": "kwobafredrick98@gmail.com"
  },
  {
    "name": "Nana Kyei",
    "email": "kyeibaffournana40@gmail.com"
  },
  {
    "name": "Kwesi",
    "email": "kyesikwesi67@gmail.com"
  },
  {
    "name": "Ranit",
    "email": "laikhoithemranit@gmail.com"
  },
  {
    "name": "Lawal",
    "email": "lawalabdulkabeer001@gmail.com"
  },
  {
    "name": "Faith",
    "email": "mbeluenefaithchioma@gmail.com"
  },
  {
    "name": "Meet",
    "email": "meetbabariya66@gmail.com"
  },
  {
    "name": "Mekha",
    "email": "mekhavijay1031@gmail.com"
  },
  {
    "name": "Melissa",
    "email": "melissavanezis33@gmail.com"
  },
  {
    "name": "Maira",
    "email": "mgodswill214@gmail.com"
  },
  {
    "name": "Abdul Kadir",
    "email": "mohammed.abdulkadir30@gmail.com"
  },
  {
    "name": "Mohamed Najib Yassin",
    "email": "Mohamednajib635@gmail.com"
  },
  {
    "name": "Mahmoud Mohamed",
    "email": "mohammedmomo47@gmail.com"
  },
  {
    "name": "Mohammed Ibrahim",
    "email": "mohammedshahnawaz.bhu@gmail.com"
  },
  {
    "name": "Mohd Shoaib",
    "email": "mohdshoaib88628@gmail.com"
  },
  {
    "name": "Monis",
    "email": "monisqazi57@gmail.com"
  },
  {
    "name": "Mubashir",
    "email": "mubashirfadima10@gmail.com"
  },
  {
    "name": "Mumtaz",
    "email": "mumtazmd812@gmail.com"
  },
  {
    "name": "Musa Usman",
    "email": "musanyakuruma77@gmail.com"
  },
  {
    "name": "Mussa Mohammed",
    "email": "mussamohammed760@gmail.com"
  },
  {
    "name": "Muthukumaran",
    "email": "muthukumaran.rp@gmail.com"
  },
  {
    "name": "Emmanuel",
    "email": "naija4r33@gmail.com"
  },
  {
    "name": "Nancy",
    "email": "nancy.gupta5489@gmail.com"
  },
  {
    "name": "Ndifreke",
    "email": "ndifrekenyoyoko@yahoo.com"
  },
  {
    "name": "Nitika Choudhary",
    "email": "nitikachoudhary96@gmail.com"
  },
  {
    "name": "Nabila",
    "email": "nourhanelassibi1@gmail.com"
  },
  {
    "name": "Nusrat",
    "email": "nusrat28101998@gmail.com"
  },
  {
    "name": "Oke",
    "email": "okeavogreat4@gmail.com"
  },
  {
    "name": "Olga",
    "email": "olgatan2020@gmail.com"
  },
  {
    "name": "Olukorede",
    "email": "olukoredeolaitan123@gmail.com"
  },
  {
    "name": "Olumide Olowodola",
    "email": "olumideowodola123@gmail.com"
  },
  {
    "name": "Omkar",
    "email": "omkarsolanke0202@gmail.com"
  },
  {
    "name": "Raheem",
    "email": "onyeukwuraheem7@gmail.com"
  },
  {
    "name": "Osman Ibrahim",
    "email": "osmanibrahim5476@gmail.com"
  },
  {
    "name": "Praneeth Kakarla",
    "email": "praneethshiva9616@gmail.com"
  },
  {
    "name": "Priyanka",
    "email": "priyanka.cr7@gmail.com"
  },
  {
    "name": "Priyank",
    "email": "priyankp1999@gmail.com"
  },
  {
    "name": "Prachi",
    "email": "prachigolchha77@gmail.com"
  },
  {
    "name": "Pramita",
    "email": "pramitamanandhar47@gmail.com"
  },
  {
    "name": "Prem",
    "email": "premanjan94@gmail.com"
  },
  {
    "name": "Muhammed Sadiq",
    "email": "sadiq.omoniyi@gmail.com"
  },
  {
    "name": "Samuel",
    "email": "samuellazycreativity@gmail.com"
  },
  {
    "name": "Samuel",
    "email": "samuelspeters@gmail.com"
  },
  {
    "name": "Samuel",
    "email": "samuelsylvester024@gmail.com"
  },
  {
    "name": "Sam",
    "email": "samuelukugha24@gmail.com"
  },
  {
    "name": "Sangram",
    "email": "sangramlenka472@gmail.com"
  },
  {
    "name": "Satyam",
    "email": "satyampatel469000@gmail.com"
  },
  {
    "name": "Saurabh Yadav",
    "email": "saurabhyadavj33@gmail.com"
  },
  {
    "name": "B Saurabh",
    "email": "sauravb7777@gmail.com"
  },
  {
    "name": "Shweta",
    "email": "shwetapoojary25@gmail.com"
  },
  {
    "name": "Siddhi",
    "email": "siddhidivate9@gmail.com"
  },
  {
    "name": "Sidra",
    "email": "sidrafehreen1@gmail.com"
  },
  {
    "name": "Saide",
    "email": "sigwineguigeline@gmail.com"
  },
  {
    "name": "Aisha",
    "email": "sodiqaloola@gmail.com"
  },
  {
    "name": "Sohaib",
    "email": "sohaib.razaq0101@gmail.com"
  },
  {
    "name": "Solomon",
    "email": "solomonfmc@gmail.com"
  },
  {
    "name": "Stanley",
    "email": "stanleygitalu@gmail.com"
  },
  {
    "name": "Stella",
    "email": "stellamarischinenye6@gmail.com"
  },
  {
    "name": "Ademola Steven",
    "email": "steven.adewunmi@icloud.com"
  },
  {
    "name": "Stephen",
    "email": "steveturn12345@gmail.com"
  },
  {
    "name": "Sudhanshu",
    "email": "sudhanshu128129@gmail.com"
  },
  {
    "name": "Suhail",
    "email": "suhailshaikh3252@gmail.com"
  },
  {
    "name": "Suhel",
    "email": "suhel.1984@gmail.com"
  },
  {
    "name": "Suma",
    "email": "sumamathi17@gmail.com"
  },
  {
    "name": "Subramanian",
    "email": "sundeepsubramanian27@gmail.com"
  },
  {
    "name": "Sunshine",
    "email": "sunshinennamasongha@gmail.com"
  },
  {
    "name": "Shashank Yadav",
    "email": "svshashank9696@gmail.com"
  },
  {
    "name": "Syed",
    "email": "syedmoahtesham59@gmail.com"
  },
  {
    "name": "Taaseen",
    "email": "taaseenmahmoodk@gmail.com"
  },
  {
    "name": "Tavishi",
    "email": "tavishivijaykumar@gmail.com"
  },
  {
    "name": "Mudit",
    "email": "teammuditgokul@gmail.com"
  },
  {
    "name": "Tega",
    "email": "tegaosobe007@gmail.com"
  },
  {
    "name": "Theophile",
    "email": "theopile.dev05@gmail.com"
  },
  {
    "name": "Tonye",
    "email": "tonyenuoma@gmail.com"
  },
  {
    "name": "Udayraj",
    "email": "udayrajsonawane44@gmail.com"
  },
  {
    "name": "Ugonna",
    "email": "ugonnanwachukwu82@gmail.com"
  },
  {
    "name": "Uday",
    "email": "umapatil1704@gmail.com"
  },
  {
    "name": "Wasiu",
    "email": "wasiuaoyebola@gmail.com"
  },
  {
    "name": "Joaquim",
    "email": "williamjoaquim48@gmail.com"
  },
  {
    "name": "Wasiu",
    "email": "wasiugoke1992@gmail.com"
  },
  {
    "name": "Hina",
    "email": "yahya.hina702@gmail.com"
  },
  {
    "name": "Abdul-Rahman",
    "email": "yusifabdulrahman33@gmail.com"
  },
  {
    "name": "Zaid",
    "email": "zaidansarishaikh@gmail.com"
  },
  {
    "name": "Zain",
    "email": "zainulabideen2000@gmail.com"
  },
  {
    "name": "Zainab",
    "email": "zainabmubarakahmed@gmail.com"
  },
  {
    "name": "Zohra",
    "email": "zohraqim@gmail.com"
  },
  {
    "name": "Zohra",
    "email": "zohraqim@gmail.com"
  },
  {
    "name": "Solomon",
    "email": "solomonfmc@gmail.com"
  },
  {
    "name": "Janet",
    "email": "ogumwomojanet75@gmail.com"
  }
]
;

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
