import { Box, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  // For navigation
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flex: 1,
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        component="h1"
        sx={{ fontFamily: "Integral Oblique, sans-serif" }}
      >
        Erreur 404
      </Typography>
      <Typography component="h2">Page non trouvée</Typography>
      <Typography
        component="h3"
        sx={{ cursor: "pointer", textDecoration: "underline" }}
        onClick={() => navigate("/")}
      >
        Retour à l'accueil
      </Typography>
    </Box>
  );
}

export default NotFound;
