import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Verification() {
  // Get the verification token in the url
  const { token } = useParams();
  // State to store the response from the server
  const [response, setResponse] = useState("");
  // State to handle the loading state
  const [loading, setLoading] = useState(true);
  // State error
  const [error, setError] = useState(false);
  // Navigate
  const navigate = useNavigate();
  // Got to the login page
  const goToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    // Send the verification token to the server
    fetch(`http://localhost:3032/user/verification/${token}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.verification) {
          setError(true);
        }
        setResponse(data.message);
        setLoading(false);
      });
  }, [token, error]);

  if (loading) {
    return (
      <Box
        sx={{
          padding: "0 5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="h1">
          Vérification en cours...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "0 5%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{
          m: 1,
          bgcolor: "transparent",
          border: "1px solid",
          borderColor: error ? "#FF0000" : "#00A656",
        }}
      >
        {error ? (
          <CloseIcon sx={{ fill: "#FF0000" }} />
        ) : (
          <CheckIcon sx={{ fill: "#00A656" }} />
        )}
      </Avatar>
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontFamily: "Integral Oblique, sans-serif", mb: 4 }}
      >
        Verification du mail
      </Typography>
      <Typography>{response}</Typography>
      {!error && (
        <Button variant="outlined" sx={{ mt: 2 }} onClick={goToLogin}>
          Se connecter
        </Button>
      )}
    </Box>
  );
}
