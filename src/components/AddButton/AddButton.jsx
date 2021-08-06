import styled from "styled-components";
import React from "react";

const StyledAddButton = styled.button`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  border: 1px solid #fff;
  position: relative;

  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    height: 2px;
    background-color: #fff;
  }
  &::before {
    transform: translate(-50%, -50%) rotate(90deg);
  }
  &::after {
    transform: translate(-50%, -50%);
  }
  &:hover {
    transform: scale(1.1);
  }
`;

const AddButton = ({
  type = "submit",
  className = "",
  size = "2rem",
  onClick: action,
}) => {
  return (
    <StyledAddButton
      type={type}
      className={className}
      size={size}
      onClick={typeof action === "function" ? action : null}
    />
  );
};

export default AddButton;
