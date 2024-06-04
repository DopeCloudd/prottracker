import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function BuyButton({ url, type }) {
  if (url === undefined) {
    throw new Error(
      "La prop 'url' est obligatoire pour le composant BuyButton"
    );
  }

  if (type === undefined) {
    throw new Error(
      "La prop 'type' est obligatoire pour le composant BuyButton"
    );
  }

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
        width: type === "product" ? "100%" : "40%",
        borderRadius: "6px",
        fontWeight: "bold",
        mt: type === "product" ? 2 : 0,
        mb: type === "product" ? 2 : 0,
        mr: type === "product" ? 0 : 2,
      }}
    >
      {t("product.button")}
    </Button>
  );
}
