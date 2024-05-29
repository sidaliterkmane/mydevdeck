const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { generateTemporaryPassword } = require("../helpers/passwordHelper");
const UserModel = require("../models/user");

// Configure the email transporter using Outlook (or any other) service and
// credentials from env variables
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send an email with temporary password, and register user in DB
const sendRegistrationEmail = async (email) => {
  const temporaryPassword = generateTemporaryPassword();

  try {
    // Hash the temporary password before saving it to the databse
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Create a new user in the database
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      completedRegistration: false,
    });

    // Ensure the connection is still open
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Mongoose connection is not open');
    }

    await newUser.save();
    console.log("User registered successfully");

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email adress
      to: email, // Recipient's email address
      subject: "MyDevDeck - Complete Your Registration",
      text: `Thank you for your purchase and welcome to MyDevDeck!`,
      html: `<p>Thank you for your purchase and welcome to MyDevDeck! <br/><br/> Here is your temporary password : ${temporaryPassword} <br/><br/> Please complete your registration by setting your own password on our <a href="http://localhost:5173/login">login page</a>.</p>`,
    };

    // Send the email using the configured transporter
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

module.exports = sendRegistrationEmail;
