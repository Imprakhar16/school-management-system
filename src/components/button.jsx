import React from "react";

const Button = ({ className, title, type, disabled, onClick }) => {
  return (
    <button type={type} className={className} disabled={disabled} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
