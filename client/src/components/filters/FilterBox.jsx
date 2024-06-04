import { Box } from "@mui/system";
import React from "react";
import Brand from "./Brand";
import Rate from "./Rate";
import Sort from "./Sort";

export default function FilterBox({ brandList }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        mt: 3,
        mb: 2,
      }}
    >
      <Brand list={brandList} />
      <Sort />
      <Rate />
    </Box>
  );
}
