const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in the environment variables");
    }
    await mongoose.connect(process.env.MONGO_URL, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // Adjust the timeout as needed
    });
    console.log('DB Connected.');
  } catch (err) {
    console.error('DB Failed To Connect', err);
  }
};

module.exports = connectDB;
