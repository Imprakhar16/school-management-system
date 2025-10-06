// components/SearchInput.jsx
import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

const SearchInput = ({ value, onChange, placeholder = "Search...", debounceTime = 300 }) => {
  const [internalValue, setInternalValue] = useState(value || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(internalValue);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [internalValue, onChange, debounceTime]);

  return (
    <TextField
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      fullWidth
    />
  );
};

export default SearchInput;
