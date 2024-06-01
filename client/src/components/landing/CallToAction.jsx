import { Box, Button, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ActionButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "0.6em 2em",
  borderRadius: "18px",
  outline: "2px solid",
  outlineColor: alpha("#00A656", 0.1),
  boxShadow: `0 0 24px 12px ${alpha("#00A656", 0.2)}`,
}));

export default function CallToAction() {
  // For translation
  const { t } = useTranslation();
  // For navigation
  const navigate = useNavigate();
  // Go to filtres page
  const handleButtonClick = () => {
    navigate("/categories");
  };

  return (
    <Box
      id="calltoaction"
      sx={{
        pt: 4,
        pb: 4,
        backgroundColor: "#171717",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "fit-content",
          width: { xs: "70%", md: "50%" },
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ActionButton onClick={handleButtonClick}>
          {t("home.button")}
        </ActionButton>
      </Box>
    </Box>
  );
}
