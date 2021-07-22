import { memo } from "react";
import styled from "styled-components";

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

const AddButton = ({ className, size, onClick: action }) => {
  return (
    <StyledAddButton
      type="button"
      className={className ? className : ""}
      size={size ? size : "2rem"}
      onClick={typeof action === "function" ? action : ""}
    />
  );
};

export default memo(AddButton);
