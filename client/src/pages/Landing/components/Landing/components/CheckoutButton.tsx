import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const publicStripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const testPublicStripeKey = import.meta.env.VITE_TEST_STRIPE_PUBLISHABLE_KEY;

const CheckoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const stripePromise = await loadStripe(testPublicStripeKey);
    try {
      const response = await fetch("http://localhost:3000/api/payment/create-checkout-session", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const session = await response.json();
      const { error } = await stripePromise?.redirectToCheckout({
        sessionId: session.id
      }) || {};

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error('Error during payment processing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handlePayment} disabled={loading}>
      {loading ? "Processing..." : "Get started"}
    </button>
  );
};

export default CheckoutButton;