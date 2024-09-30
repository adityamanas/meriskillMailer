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
  { "name": "Sakshi Singh", "email": "20singhsakshi@gmail.com" },
  { "name": "Kashish Solkhiya", "email": "71420kashish@gmail.com" },
  { "name": "Sodiq Abiodun Akala", "email": "absodiq2009@gmail.com" },
  { "name": "Auwal Abubakar Musa", "email": "abubakarauwal621@gmail.com" },
  { "name": "Adebisi Oluwadamilola", "email": "adebisida7@gmail.com" },
  { "name": "Omolara Chukwuka", "email": "adedokunomolara14@gmail.com" },
  { "name": "Adeleye Anne", "email": "adeleyeanne2014@gmail.com" },
  { "name": "Adenike", "email": "adenikeidowu27@yahoo.com" },
  { "name": "Adeola Adeyeye", "email": "adeyeyeadeola32@gmail.com" },
  { "name": "Aditya Chauhan", "email": "adityachauhan260604@gmail.com" },
  { "name": "Kaushiki Agarwal", "email": "agarwalkaushiki@yahoo.in" },
  { "name": "Ahmed Sameh", "email": "ahmed.sameh.abdelazeem09@gmail.com" },
  { "name": "Aisha", "email": "aichahriz77@gmail.com" },
  { "name": "Guillermo Enrique", "email": "aijemomem@gmail.com" },
  { "name": "Aishwarya", "email": "aishpatil655@gmail.com" },
  { "name": "Aishwarya C", "email": "aishwaryac191@gmail.com" },
  { "name": "Chrisphine", "email": "ajuogachris56@gmail.com" },
  { "name": "Akash Saini", "email": "akashsaini85452@gmail.com" },
  { "name": "David", "email": "Alaskadavid1994@gmail.com" },
  { "name": "Alfonso Camarillo", "email": "alfonso.camarillo.1@gmail.com" },
  { "name": "Mohamed", "email": "alshuwaimimohamed204@gmail.com" },
  { "name": "Udodilim", "email": "amaechiudoilim@gmail.com" },
  { "name": "Amul Suraksh Paleti", "email": "amulsuraksh123@gmail.com" },
  { "name": "Anas", "email": "anasashraf1919@gmail.com" },
  { "name": "Anas", "email": "anasirfan902@gmail.com" },
  { "name": "Andrew Agbo Nnabuike", "email": "andrewagbo50@gmail.com" },
  { "name": "Muhammed Ashique M K", "email": "ashiquemk25@gmail.com" },
  { "name": "Devanshi", "email": "ashiranasohang@gmail.com" },
  { "name": "Ashutosh Sharma", "email": "Ashutosh11096@gmail.com" },
  { "name": "Blessing Awoke", "email": "awokeblessing53@gmail.com" },
  { "name": "Freda", "email": "awuraesluv@gmail.com" },
  { "name": "Oluwasegun Babawale", "email": "babawaleoluwasegun90@gmail.com" },
  { "name": "Bashirat", "email": "bashirateniola1@gmail.com" },
  { "name": "Bhavana", "email": "bhavanavuppu1715@gmail.com" },
  { "name": "Biliameen", "email": "biliameenzubair@gmail.com" },
  { "name": "Favor Braide", "email": "braidefavor@gmail.com" },
  { "name": "Catherine Cynthia T", "email": "catherinecynthia22@gmail.com" },
  { "name": "Cathrine", "email": "cathrinejenitta@gmail.com" },
  { "name": "Enjeela", "email": "cenjeela12@gmail.com" },
  { "name": "Christiana", "email": "chascalinreal5@gmail.com" },
  { "name": "David Nady", "email": "davidnady4yad@gmail.com" },
  { "name": "Doaa", "email": "doaaayman784@gmail.com" },
  { "name": "Doris Ugochi Nwauwa", "email": "dorisnwauwa@gmail.com" },
  { "name": "Yasmine", "email": "elmerslyyassmine01@gmail.com" },
  { "name": "Emmanuel Dadson", "email": "emmanueldadson36@gmail.com" },
  { "name": "Esther", "email": "estherolabisifehintola@gmail.com" },
  { "name": "Ruth", "email": "eziwealth16@gmail.com" },
  { "name": "Fadwa Banhar", "email": "fadwabanhar24@gmail.com" },
  { "name": "Farah", "email": "farah.asheta@gmail.com" },
  { "name": "Firda Della Irawan", "email": "firdadellairawan@gmail.com" },
  { "name": "Manish", "email": "gawademanish5@gmail.com" },
  { "name": "Onuoha Genevieve Ebubechukwu", "email": "genevieveonuoha4@gmail.com" },
  { "name": "Priyanka Ghuge", "email": "ghuge.pinku@gmail.com" },
  { "name": "Gift", "email": "gugbelenta@gmail.com" },
  { "name": "Haritha K B", "email": "hariaish2002@gmail.com" },
  { "name": "Edwige", "email": "hashleyed@gmail.com" },
  { "name": "Himani Pardasani", "email": "himanipardasani7@gmail.com" },
  { "name": "Hossam", "email": "hossamelsrah5@gmail.com" },
  { "name": "Hassan Hussain Muhammad", "email": "Hussainhassan682@gmail.com" },
  { "name": "Ibinabo Altraide", "email": "Ibialtraidr@yahoo.com" },
  { "name": "Godsfavour", "email": "igburukef@gmail.com" },
  { "name": "Ikram", "email": "ikrammisbah65@gmail.com" },
  { "name": "Isaac", "email": "isaacmuriithi17@gmail.com" },
  { "name": "Itrat Zehra", "email": "itratzehragiga@gmail.com" },
  { "name": "Vinay James", "email": "james.vinay73@gmail.com" },
  { "name": "Jay", "email": "jaysinghh75@gmail.com" },
  { "name": "Jamila", "email": "jlaafaoui@gmail.com" },
  { "name": "John", "email": "johndamicole@gmail.com" },
  { "name": "Joyce Fred", "email": "joycefred31@gmail.com" },
  { "name": "Kamlesh Chollangi", "email": "kamleshchollangi39@gmail.com" },
  { "name": "Kanhu", "email": "Kanhu.pamini@yahoo.com" },
  { "name": "Deepak Singh Karmiyal", "email": "karmiyaldeepak010@gmail.com" },
  { "name": "Katini Mambea", "email": "katinimambea@gmail.com" },
  { "name": "Khayrul Alam Touhid", "email": "khayrulalamtouhid123@gmail.com" },
  { "name": "Abdul Moiz", "email": "komano9398@abatido.com" },
  { "name": "Mavis", "email": "korkortaylor@gmail.com" },
  { "name": "Rudraksh Kaushik", "email": "Krudraksh.10@gmail.com" },
  { "name": "Temidayo", "email": "kukoyitemidayoifeoluwa@gmail.com" },
  { "name": "Mokgadi", "email": "lerunnermd@gmail.com" },
  { "name": "Lindokuhle Mahlangu", "email": "mahlangulindokuhle29@gmail.com" },
  { "name": "Manan Taneja", "email": "manan.taneja0004@gmail.com" },
  { "name": "Ntokozo", "email": "mdhlulintokozohope@gmail.com" },
  { "name": "Menbere Desalegn", "email": "menbereemen@gmail.com" },
  { "name": "Michael", "email": "micval625@gmail.com" }
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
