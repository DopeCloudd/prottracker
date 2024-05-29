import { Box } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

export default function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchStripePublicKey = async () => {
      const { data } = await Axios.get(
        "http://localhost:3032/stripe/public-key"
      );
      const stripe = await loadStripe(data.publicKey);
      setStripePromise(stripe);
    };

    fetchStripePublicKey();
  }, []);

  useEffect(() => {
    const createPaymentIntent = async () => {
      fetch("http://localhost:3032/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1000 }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    };

    createPaymentIntent();
  }, []);

  const appearance = {
    theme: "flat",
    labels: "floating",
    variables: {
      colorPrimary: "#00A656",
      colorBackground: "#121212",
      colorText: "#EAEDED",
      colorDanger: "#df1b41",
      fontFamily: "Ideal Sans, system-ui, sans-serif",
      spacingUnit: "2px",
      borderRadius: "4px",
    },
    rules: {
      ".Input": {
        border: "1px solid #00A656",
        backgroundColor: "#121212",
      },
      ".Tab": {
        backgroundColor: "#121212",
        border: "1px solid #00A656",
      },
      ".Tab--selected": {
        border: "1px solid #00A656",
      },
    },
  };

  const options = {
    clientSecret,
    appearance: appearance,
  };

  return (
    <Box>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </Box>
  );
}
