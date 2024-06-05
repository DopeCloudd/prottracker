import { Button } from "@mui/material";
import React from "react";

export default function Reset({ setFilters }) {
  const handleReset = () => {
    setFilters({
      brand: "",
      price: "",
      stars: "",
    });
  };

  return (
    <Button
      variant="outlined"
      onClick={handleReset}
      sx={{ minHeight: "100%", minWidth: "fit-content", width: "100%" }}
    >
      Réinitialiser
    </Button>
  );
}
