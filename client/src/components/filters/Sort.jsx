import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

export default function Sort() {
  const [priceSort, setPriceSort] = useState("");

  const handleChange = (event) => {
    setPriceSort(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="price-select-label">Prix</InputLabel>
      <Select
        labelId="price-select-label"
        id="price-select"
        value={priceSort}
        label="Prix"
        onChange={handleChange}
      >
        <MenuItem value="asc">Prix croissant</MenuItem>
        <MenuItem value="desc">Prix décroissant</MenuItem>
      </Select>
    </FormControl>
  );
}
