const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const mailConfig = {
  service: 'gmail',
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(mailConfig);

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Video Organizer',
    link: 'http://localhost:5000/',
  },
});

const response = (videos, user) => ({
  body: {
    name: user.name,
    intro: `Hi, ${user.name}. Checkout the latest videos.`,
    table: {
      data: videos.map((video) => ({
        url: video.url,
      })),
    },
    outro: 'Hope you liked the videos',
  },
});

const emailSuggestedVideos = async ({ videos, users }) => {
  const emailPromises = users.map(async (user) => {
    try {
      const email = mailGenerator.generate(response(videos, user));
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: 'Video Organizer Suggested Videos',
        html: email,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${user.email}`);
    } catch (error) {
      console.error(`Failed to send email to ${user.email}`, error);
    }
  });

  try {
    await Promise.all(emailPromises);
    console.log('All emails sent successfully');
  } catch (error) {
    console.error('Error sending emails', error);
  }
};

module.exports = { emailSuggestedVideos };
