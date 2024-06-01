import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function BuyButton({ url }) {
  const { t } = useTranslation();
  // Function that sends to merchant site url
  const goToUrl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Button
      onClick={() => goToUrl(url)}
      variant="outlined"
      sx={{
        width: "100%",
        borderRadius: "6px",
        fontWeight: "bold",
        mt: 2,
        mb: 2,
      }}
    >
      {t("product.button")}
    </Button>
  );
}
