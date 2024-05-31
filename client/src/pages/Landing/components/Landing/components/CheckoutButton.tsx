import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

import { TbCardsFilled } from "react-icons/tb";

const publicStripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const testPublicStripeKey = import.meta.env.VITE_TEST_STRIPE_PUBLISHABLE_KEY;

const deckIcon = <TbCardsFilled className="icon" color="white" size={"25px"} />;

const CheckoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const stripePromise = await loadStripe(testPublicStripeKey);
    try {
      const response = await fetch(
        "http://localhost:3000/api/payment/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();
      const { error } =
        (await stripePromise?.redirectToCheckout({
          sessionId: session.id,
        })) || {};

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="
        checkout-button
        w-[300px] 
        h-[50px]
        bg-[#1100ff] 
        px-16 
        rounded-lg 
        font-semibold 
        text-sm 
        transition
        flex
        gap-2
        justify-center
        items-center hover:brightness-95
      "
    >
      <div className="w-[30px] flex justify-center items-center">{deckIcon}</div>
      {loading ? "Processing..." : "Get your DevDeck"}
    </button>
  );
};

export default CheckoutButton;
