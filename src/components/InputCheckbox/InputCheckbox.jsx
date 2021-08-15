import React, { forwardRef } from "react";
import StyledInputCheckBox from "./InputCheckbox.style.js";

const InputCheckbox = forwardRef(
  (
    { checked = false, disabled = false, onChange: action, className = "" },
    ref
  ) => {
    return (
      <StyledInputCheckBox className={className}>
        <input
          checked={checked}
          onChange={typeof action === "function" ? action : ""}
          type="checkbox"
          disabled={disabled}
          ref={ref}
        />
        <span />
      </StyledInputCheckBox>
    );
  }
);

export default InputCheckbox;
