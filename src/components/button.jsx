import { Button } from "@mui/material";
import React from "react";

const ButtonComp = ({ className, title, type, disabled, onClick, color, variant, fullwidth }) => {
  return (
    <Button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      color={color}
      variant={variant}
      fullWidth={fullwidth}
    >
      {title}
    </Button>
  );
};

export default ButtonComp;
