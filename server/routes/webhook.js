const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { stripeTest } = require("../config/stripe");
const sendRegistrationEmail = require("../config/mail");

// Endpoint secret for verifying webhook signatures
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Route to handle Stripe webhook events
router.post("/webhook-onetime-payment", bodyParser.raw({ type: "application/json" }), async (req, res) => {
  const payload = req.body; // Raw body of the webhook event
  const sig = req.headers["stripe-signature"]; // Signature header from Stripe
  let event;

  try {
    // Verify the event using Stripe's SDK
    event = stripeTest.webhooks.constructEvent(payload, sig, endpointSecret);
    console.log("Webhook verified successfully");
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Checkout session completed:", session);

    try {
      const sessionDetails = await stripeTest.checkout.sessions.retrieve(session.id, { expand: ["line_items", "customer"] });

      const customerDetails = sessionDetails.customer_details;
      console.log("Session details retrieved successfully:", sessionDetails);

      if (session.payment_status === "paid") {
        // Log success message and send magic link email if payment is successful
        console.log("Payment status is 'paid' for customer:", customerDetails.email);
        console.log("Sending email to:", customerDetails.email);
        sendRegistrationEmail(customerDetails.email);
      }
    } catch (error) {
      console.error("Error retrieving session details or sending email:", error);
    }
  }

  // Respond to Stripe to acknowledge the receipt of the event
  res.status(200).end();
});

module.exports = router;