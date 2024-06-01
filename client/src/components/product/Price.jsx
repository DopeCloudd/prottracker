import { Typography } from "@mui/material";
import React from "react";

export default function Price({ value }) {
  const prixFormate = value.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  return (
    <Typography
      component="h2"
      sx={{
        mr: 1,
        color: "#e00034",
        fontSize: "clamp(1.375rem, 0.9063rem + 1.25vw, 2rem)",
      }}
    >
      {prixFormate}
    </Typography>
  );
}
