import React, { useState } from 'react';
import styled from 'styled-components';
import hide from "./hide.svg";
import show from "./show.svg";

const StyledInputPassword = styled.div`
  input {
    width: 100%;
    resize: none;
    padding: 4px;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0);
    border: 1px #2b3044 solid;
    color: #ccc;
    transition: border 0.2s ease, color 0.2s ease;
    border-radius: 3px;
    position: relative;
  }
  input:focus {
    border: 1px #395ac0 solid;
    box-shadow: 0px 0px 3px 1px #395ac050;
    color: #fff;
  }

  position: relative;
  button{
    content: '';
    position: absolute;
    top: 50%;
    right: 0.4rem;
    transform: translateY(-50%);
    height: calc(1rem + 8px);
    width: 1.6rem;
    background: url(${({ inputType }) => inputType === "password" ? hide : show}) center / cover no-repeat;
    &:focus,
    &:hover{
      filter: drop-shadow(0 0 2px ${({ inputType }) => inputType === "password" ? "#ddd" : "#5c86ff"});
    }
  }
`;

function InputPassword({ value = "", onChange, placeholder = "Password" }) {
  const [inputType, setInputType] = useState("password");

  const toggleInputType = () => {
    if (inputType === "password") setInputType("text");
    else setInputType("password");
  }

  return (
    <StyledInputPassword inputType={inputType}>
      <input
        value={value}
        type={inputType}
        onChange={typeof onChange === "function" ? onChange : null}
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={toggleInputType}
      />
    </StyledInputPassword>
  );
}

export default InputPassword;