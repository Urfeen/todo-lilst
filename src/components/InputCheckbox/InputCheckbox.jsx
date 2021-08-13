import React from "react";
import StyledInputCheckBox from "./InputCheckbox.style.js";

const InputCheckbox = ({
  checked = false,
  disabled = false,
  onChange: action,
  className = "",
}) => {
  return (
    <StyledInputCheckBox className={className}>
      <input
        checked={checked}
        onChange={typeof action === "function" ? action : ""}
        type="checkbox"
        disabled={disabled}
      />
      <span />
    </StyledInputCheckBox>
  );
};

export default InputCheckbox;
