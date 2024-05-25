const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET);
const stripeTest = Stripe(process.env.TEST_STRIPE_SECRET);

module.exports = { stripe, stripeTest };