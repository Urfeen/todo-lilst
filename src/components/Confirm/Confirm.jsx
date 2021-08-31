import React from "react";
import styled from "styled-components";

const StyledConfirm = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  gap: 10px;
  button {
    padding: 7px 10px;
    border: 1px #2b3044 solid;
    border-radius: 4px;

    font-size: 1rem;
    color: #ccc;

    transition: background-color 0.2s ease, border 0.2s ease, color 0.2s ease;
  }
  .confirm-accept {
    background-color: #1b274b87;
  }
  .confirm-decline {
    background-color: #5a14075c;
  }
  .confirm-accept:disabled{
    pointer-events: none;
    background-color: #1b274b55;
    color: #aaa;
  }
  .confirm-decline:disabled{
    pointer-events: none;
    background-color: #5a130721;
    color: #aaa;
  }
  
  .confirm-accept:focus,
  .confirm-accept:hover {
    border: 1px #395ac0 solid;
    box-shadow: 0px 0px 3px 1px #395ac050;
    color: #ffffff;
    background-color: #1b2e6686;
  }
  .confirm-decline:focus,
  .confirm-decline:hover {
    border: 1px #c51e00ab solid;
    box-shadow: 0px 0px 3px 1px #681507;
    color: #ffffff;
    background-color: #7215045c;
  }
`;

const Confirm = ({
  type = "submit",
  className = "",
  justifyContent = "center",
  onAccept,
  onDecline,
  showDecline = true,
  showAccept = true,
  declineDisabled = false,
  acceptDisabled = false,
  acceptText,
  declineText,
  acceptTabIndex = 0,
  declineTabIndex = 0,
}) => {
  return (
    <StyledConfirm justifyContent={justifyContent} className={className}>
      {showAccept && (
        <button
          onClick={typeof onAccept === "function" ? onAccept : null}
          type={type}
          className="confirm-accept"
          tabIndex={acceptTabIndex}
          disabled={acceptDisabled}
        >
          {acceptText || "Accept"}
        </button>
      )}
      {showDecline && (
        <button
          onClick={typeof onDecline === "function" ? onDecline : null}
          type={type}
          className="confirm-decline"
          tabIndex={declineTabIndex}
          disabled={declineDisabled}
        >
          {declineText || "Decline"}
        </button>
      )}
    </StyledConfirm>
  );
};

export default Confirm;
