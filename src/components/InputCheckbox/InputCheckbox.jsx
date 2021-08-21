import React, { forwardRef } from "react";
import StyledInputCheckBox from "./InputCheckbox.style.js";

const InputCheckbox = forwardRef(
  (
    {
      checked = false,
      disabled = false,
      onChange: action,
      className = "",
      id = "",
      onFocus,
      onBlur,
      tabIndex = 0
    },
    ref
  ) => {
    return (
      <StyledInputCheckBox className={className}>
        <input
          // defaultChecked={checked}
          checked={checked}
          onChange={typeof action === "function" ? action : null}
          onFocus={typeof onFocus === "function" ? onFocus : null}
          onBlur={typeof onBlur === "function" ? onBlur : null}
          type="checkbox"
          disabled={disabled}
          ref={ref}
          tabIndex={tabIndex}
          id={id}
        />
        <span />
      </StyledInputCheckBox>
    );
  }
);

export default InputCheckbox;
