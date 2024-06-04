import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

export default function Rate() {
  const [ratingValue, setRatingValue] = useState("");

  const handleChange = (event) => {
    setRatingValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="star-select-label">Étoiles</InputLabel>
      <Select
        labelId="star-select-label"
        id="star-select"
        value={ratingValue}
        label="Étoiles"
        onChange={handleChange}
      >
        <MenuItem value="asc">Évaluations croissante</MenuItem>
        <MenuItem value="desc">Évaluations décroissante</MenuItem>
      </Select>
    </FormControl>
  );
}
