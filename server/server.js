require("dotenv").config({ path: '../.env' })

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

const app = express();

// Database connection
connectDB();

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with frontend's URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Route for handling webhook events with raw body parser
app.post(
  "/webhook-onetime-payment",
  bodyParser.raw({ type: "application/json" }),
  (req, res, next) => {
    console.log("Received a request at /webhook-onetime-payment");
    next();
  },
  require("./routes/webhook")
);

// General JSON parsing middleware
app.use(express.json());

// Routes for payment-related endpoints
app.use("/api/payment", require("./routes/payment"));

// Routes for user authentication
app.use("/auth", require('./routes/auth'))

// Start the server and listen on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});