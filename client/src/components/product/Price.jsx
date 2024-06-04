import { Typography } from "@mui/material";
import React from "react";

export default function Price({ value, type }) {
  if (value === undefined) {
    throw new Error("La prop 'value' est obligatoire");
  }

  const prixFormate = value.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  return (
    <Typography
      component={type === "product" ? "h2" : "h4"}
      sx={{
        mr: type === "product" ? 1 : undefined,
        color: "#e00034",
        fontWeight: "bold",
        fontSize:
          type === "product"
            ? "clamp(1.375rem, 0.9063rem + 1.25vw, 2rem)"
            : undefined,
      }}
    >
      {prixFormate}
    </Typography>
  );
}
