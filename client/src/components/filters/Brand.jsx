import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

export default function Brand({ list }) {
  const [brand, setBrand] = useState("");

  const handleChange = (event) => {
    setBrand(event.target.value);
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
        value={brand}
        label="Marque"
        onChange={handleChange}
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
