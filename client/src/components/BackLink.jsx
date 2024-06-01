import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function BackLink() {
  const { t } = useTranslation();
  // For navigation
  const navigate = useNavigate();
  // Function that sends to the list of all products in the category
  const backPreviousPage = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        paddingBottom: "16px",
      }}
    >
      <Box
        component="p"
        onClick={() => backPreviousPage()}
        sx={{
          width: "fit-content",
          borderBottom: "1px solid",
          opacity: "0.5",
          cursor: "pointer",
          "&::before": {
            content: '"< "',
          },
        }}
      >
        {t("main.back")}
      </Box>
    </Box>
  );
}
