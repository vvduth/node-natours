const nodemailer = require('nodemailer');

const sendEmail = async options => {
  //1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    logger: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
    // active in gmail "less secure app" option
  });
  //2) Define the email options
  const mailOptions = {
    from: 'Duc Thai <duc@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
    //html:
  };
  //3) Actually send the emails
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;