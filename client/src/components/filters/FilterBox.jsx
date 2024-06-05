import { Box } from "@mui/system";
import React from "react";
import Brand from "./Brand";
import Reset from "./Reset";
import Sort from "./Sort";

export default function FilterBox({ brandList, filters, setFilters }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        mt: 3,
        mb: 2,
      }}
    >
      <Brand list={brandList} filters={filters} setFilters={setFilters} />
      <Sort filters={filters} setFilters={setFilters} />
      <Reset setFilters={setFilters} />
    </Box>
  );
}
