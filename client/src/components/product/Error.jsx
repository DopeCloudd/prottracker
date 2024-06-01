import { Box } from "@mui/system";
import React from "react";

export default function Error() {
  return (
    <Box
      sx={{
        marginTop: 1,
        textAlign: "center",
      }}
    >
      <h1>Oops ! Aucun produit ne correspond, merci de revenir en lieu sûr.</h1>
    </Box>
  );
}
