import React from 'react';
import styled from 'styled-components';
import LogIn from "./LogIn.svg";
import LogOut from "./LogOut.svg";

const StyledLogInOutButton = styled.button`
  border-radius: 5px;
  padding: 14px;
  color: #ddd;
  transition: filter 0.2s ease;
  background: url(${({ isLogOut }) => isLogOut ? LogOut : LogIn}) center / cover no-repeat;
  &:hover,
  &:focus {
    filter: drop-shadow(0 0 2px #ddd);
    color: #fff;
  }
`;

function LogInOutButton({ onClick, isLogOut = false, size = 32 }) {
  return (
    <StyledLogInOutButton
      isLogOut={isLogOut}
      className="signIn-btn"
      type="button"
      onClick={typeof onClick === "function" ? onClick : null}
      size={size}
    >
    </StyledLogInOutButton>
  );
}

export default LogInOutButton;