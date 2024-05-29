require("dotenv").config();

const mongoose = require("mongoose");
const sendRegistrationEmail = require("../config/mail");
const connectDB = require("../config/db");

const testEmail = async () => {
  try {
    // Log the environment variables to ensure they are being read correctly
    console.log("MONGO_URL:", process.env.MONGO_URL);

    // Ensure the database connection is established
    await connectDB();

    // Test email address
    const email = "sidterkmane@hotmail.com";

    // Send registration email
    await sendRegistrationEmail(email);

    // Close the database connection after the operation is complete
    mongoose.connection.close();
  } catch (error) {
    console.error("Error in testEmail:", error);
  }
};

testEmail();
