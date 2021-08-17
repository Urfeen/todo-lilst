import React, { forwardRef } from "react";
import StyledInputCheckBox from "./InputCheckbox.style.js";

const InputCheckbox = forwardRef(
  (
    { checked = false, disabled = false, onChange: action, className = "", onFocus, onBlur },
    ref
  ) => {
    return (
      <StyledInputCheckBox className={className}>
        <input
          checked={checked}
          onChange={typeof action === "function" ? action : null}
          onFocus={typeof onFocus === "function" ? onFocus : null}
          onBlur={typeof onBlur === "function" ? onBlur : null}
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
