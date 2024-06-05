import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import FilterBox from "./FilterBox";

export default function DisplayFilters({ brandList, filters, setFilters }) {
  const [displayFilters, setDisplayFilters] = useState(false);

  const handleDisplayFilters = () => {
    setDisplayFilters(!displayFilters);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleDisplayFilters}
          startIcon={<FilterAltIcon />}
        >
          Filtres
        </Button>
      </Box>
      <Box
        sx={{
          display: displayFilters ? "block" : "none",
        }}
      >
        <FilterBox
          brandList={brandList}
          filters={filters}
          setFilters={setFilters}
        />
      </Box>
    </>
  );
}
