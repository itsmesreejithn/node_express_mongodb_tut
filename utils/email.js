const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // CREATE TRANSPORTER
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD,
    },
  });

  // DEFINE EMAIL OPTIONS
  const mailOptions = {
    from: "Sreejith <hello@sreejith.io>",
    to: options.emial,
    subject: options.subject,
    text: options.message,
  };

  // SEND EMAIL
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
