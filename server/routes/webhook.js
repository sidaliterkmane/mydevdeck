const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { stripeTest } = require("../config/stripe");
const sendMagicLinkEmail = require("../config/mail");

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post("/webhook-onetime-payment", bodyParser.raw({ type: "application/json" }), async (req, res) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeTest.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const sessionDetails = await stripeTest.checkout.sessions.retrieve(session.id, { expand: ["line_items", "customer"] });
    const customerDetails = sessionDetails.customer_details;

    if (session.payment_status === "paid") {
      console.log("Payment Success for customer:-", customerDetails.email);
      const magicLink = `http://localhost:5173/complete-registration?token=${session.id}`;
      sendMagicLinkEmail(customerDetails.email, magicLink);
    }
  }

  res.status(200).end();
});

module.exports = router;