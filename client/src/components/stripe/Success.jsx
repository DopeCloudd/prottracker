import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/categories");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: "100%",
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 10,
          color: "#EAEDED",
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Paiement réussi 💪
        </Typography>
        <Typography component="p" sx={{ mt: 5, textAlign: "center" }}>
          Merci pour votre abonnement et votre soutient. Vous pouvez maintenant
          accéder à tous les contenus premium. 🎉
        </Typography>
        <Typography component="p" sx={{ mt: 1, mb: 1, textAlign: "center" }}>
          N'hésitez pas à consulter nos produits pour vous aider à atteindre vos
          objectifs. 🚀
        </Typography>
        <Typography component="p" sx={{ mb: 5, textAlign: "center" }}>
          Faites nous savoir si vous avez des questions ou des suggestions. 📧
        </Typography>
        <Button variant="contained" onClick={handleButtonClick}>
          Trouver mes produits
        </Button>
      </Box>
    </Container>
  );
}
