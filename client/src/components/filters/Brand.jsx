import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export default function Brand({ list, filters, setFilters }) {
  const handleBrandChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      brand: e.target.value,
    }));
  };

  if (list.length === 0) {
    return null;
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="brands-select-label">Marque</InputLabel>
      <Select
        labelId="brands-select-label"
        id="brands-select"
        value={filters.brand || ""}
        label="Marque"
        onChange={handleBrandChange}
      >
        {list.map((brand) => (
          <MenuItem key={brand} value={brand}>
            {brand}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
