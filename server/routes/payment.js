const express = require("express");
const router = express.Router();
const { stripeTest } = require("../config/stripe");
require("dotenv").config();

// Price ID and Coupon ID for testing environment from env variables
const testPriceId = process.env.TEST_PRODUCT_PRICE_ID;
const testCouponId = process.env.TEST_COUPON_ID;

// Route to create a checkout session for Stripe payments
router.post("/create-checkout-session", async (req, res) => {
  try {
    // Create a checkout session with payment details
    const session = await stripeTest.checkout.sessions.create({
      payment_method_types: ["card"], // Accept card payments
      line_items: [
        {
          price: testPriceId, // ID of the product price (found in stripe dashboard)
          quantity: 1, // Default quantity of the product
        },
      ],
      mode: "payment", // Payment mode
      discounts: [
        {
          coupon: testCouponId, // ID of the discount coupon
        },
      ],
      success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });

    // Send session ID to client
    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;