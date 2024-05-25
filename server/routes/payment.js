const express = require("express");
const router = express.Router();
const { stripeTest } = require("../config/stripe");

const testPriceId = process.env.TEST_PRODUCT_PRICE_ID;
const testCouponId = process.env.TEST_COUPON_ID;

router.post("/create-checkout-session", async (req, res) => {
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
      success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;