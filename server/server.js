const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const Stripe = require("stripe");
const nodemailer = require("nodemailer");

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET);
const stripeTest = Stripe(process.env.TEST_STRIPE_SECRET);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const priceId = process.env.PRODUCT_PRICE_ID;
const couponID = process.env.COUPON_ID;

const testPriceId = process.env.TEST_PRODUCT_PRICE_ID;
const testCouponId = process.env.TEST_COUPON_ID;

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected."))
  .catch((err) => console.log("DB Failed To Connect", err));

// middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173", // replace with frontend's URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Apply the raw body parser only to the Stripe webhook route
app.post("/webhook-onetime-payment", bodyParser.raw({ type: 'application/json' }));

app.use((req, res, next) => {
  if (req.originalUrl === "/webhook-onetime-payment") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

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

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripeTest.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: testPriceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      discounts: [
        {
          coupon: testCouponId,
        },
      ],
      success_url:
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
