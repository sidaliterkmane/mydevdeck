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
        px-16
        border border-neutral-800 bg-neutral-900
        rounded-lg 
        font-semibold 
        text-sm 
        transition
        flex
        gap-2
        justify-center
        items-center hover:brightness-105
      "
    >
      {loading ? (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      ) : (
        <div className="flex gap-2 justify-center items-center">
          <div className="flex justify-center items-center">{deckIcon}</div>
          <p className="">Get your DevDeck</p>
        </div>
      )}
    </button>
  );
};

export default CheckoutButton;
