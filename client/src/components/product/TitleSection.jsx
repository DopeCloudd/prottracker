import { Typography } from "@mui/material";
import React from "react";

export default function TitleSection({ text }) {
  return (
    <Typography
      component="h2"
      sx={{
        padding: "0 4px",
        width: "fit-content",
        borderBottom: "3px solid #00a656",
        fontSize: "clamp(1.375rem, 0.9063rem + 1.25vw, 2rem)",
        fontFamily: "Integral, sans-serif",
        mb: 2,
      }}
    >
      {text}
    </Typography>
  );
}
