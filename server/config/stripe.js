const Stripe = require("stripe");

// Initialize Stripe with your secret keys
const stripe = Stripe(process.env.STRIPE_SECRET);
const stripeTest = Stripe(process.env.TEST_STRIPE_SECRET);

module.exports = { stripe, stripeTest };