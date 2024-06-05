import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export default function Sort({ filters, setFilters }) {
  const handlePriceChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sort: e.target.value,
    }));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="sort-select-label">Trier par</InputLabel>
      <Select
        labelId="sort-select-label"
        id="sort-select"
        value={filters.sort || ""}
        label="Trier par"
        onChange={handlePriceChange}
      >
        <MenuItem value="Ascending Price">Prix le moins élevé</MenuItem>
        <MenuItem value="Descending Price">Prix le plus élevé</MenuItem>
        <MenuItem value="Ascending Rate">Score le moins élevé</MenuItem>
        <MenuItem value="Descending Rate">Score le plus élevé</MenuItem>
      </Select>
    </FormControl>
  );
}
