import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";

const PAYMENT_SUCESS_URL = "http://localhost:3000/success";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    // Create a PaymentIntent
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: PAYMENT_SUCESS_URL,
      },
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment status:" + paymentIntent.status);
    } else {
      setMessage("Something went wrong");
    }

    setIsProcessing(false);
  };

  return (
    <Container sx={{ pt: 1 }}>
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{
          padding: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Deviens un Power Lifter
        </Typography>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "80%",
              md: "50%",
              lg: "50%",
              xl: "40%",
            },
          }}
        >
          <PaymentElement
            options={{ layout: { type: "tabs", defaultCollapsed: false } }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isProcessing}
          sx={{ marginTop: 3 }}
        >
          {isProcessing ? <CircularProgress size={24} /> : "S'abonner"}
        </Button>
        {message && <div id="payment-message">{message}</div>}
      </Box>
    </Container>
  );
}
