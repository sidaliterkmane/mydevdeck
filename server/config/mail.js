const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMagicLinkEmail = (email, magicLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "MyDevDeck - Complete Your Registration",
    text: `Thank you for your purchase! Please complete your registration by clicking the following link: ${magicLink}`,
    html: `<p>Thank you for your purchase! Please complete your registration by clicking the following link: <a href="${magicLink}">${magicLink}</a></p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendMagicLinkEmail;