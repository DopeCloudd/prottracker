import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Title() {
  // For translation
  const { t } = useTranslation();

  return (
    <Box
      id="title"
      sx={{
        pt: { xs: 4, sm: 8 },
        pb: { xs: 4, sm: 8 },
        position: "relative",
        backgroundColor: "#171717",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography
        component="h1"
        dangerouslySetInnerHTML={{ __html: t("home.main-text") }}
        sx={{
          width: { sm: "60%", lg: "80%" },
          fontFamily: "Integral, sans-serif",
          textTransform: "uppercase",
          fontSize: "clamp(1.625rem, -0.4063rem + 6.5vw, 3.25rem)",

          "& span": {
            color: "#00a656",
            fontFamily: "Integral Oblique, sans-serif",
            textTransform: "uppercase",
            fontSize: "clamp(1.625rem, -0.4063rem + 6.5vw, 3.25rem)",
          },
        }}
      />
    </Box>
  );
}
