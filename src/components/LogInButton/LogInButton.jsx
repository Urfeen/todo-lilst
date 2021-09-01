import React from 'react';
import styled from 'styled-components';
import LogIn from "./LogIn.svg";

const StyledLogInButton = styled.button`
  border-radius: 5px;
  padding: 1rem;
  color: #ddd;
  transition: filter 0.2s ease;
  background: url(${LogIn}) center / cover no-repeat;
  &:hover,
  &:focus {
    filter: drop-shadow(0 0 2px #ddd);
    color: #fff;
  }
`;

function LogInButton({ onClick, size = 32 }) {
  return (
    <StyledLogInButton
      className="signIn-btn"
      type="button"
      onClick={typeof onClick === "function" ? onClick : null}
      size={size}
    >
    </StyledLogInButton>
  );
}

export default LogInButton;