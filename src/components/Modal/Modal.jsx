import React, { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import StyledModal from "./StyledModal.style.js";

const modalRoot = document.createElement("div");
modalRoot.id = "modal-root";

if (!document.querySelector("#modal-root")) {
  document.body.appendChild(modalRoot);
}

const Modal = ({
  title = "",
  id = "modal",
  className = "",
  zIndexBox,
  children,
  onClose: close,
  modalClosing = false,
  setModalClosing,
  onUnmount: unmountAction,
}) => {
  const [fadeType, setFadeType] = useState(null);

  const transitionEndHandler = (e) => {
    if (e.propertyName !== "opacity" || fadeType === "in") return;
    if (fadeType === "out") {
      typeof unmountAction === "function" && unmountAction();
      close();
    }
  };

  const closeHandler = (e) => {
    e.preventDefault();
    setFadeType("out");
  };

  const onEscKeyDownHandler = (e) => {
    if (e.key !== "Escape") return;
    setFadeType("out");
  };

  useEffect(() => {
    setTimeout(setFadeType("in"), 0);
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", onEscKeyDownHandler);
    return () => {
      window.removeEventListener("keydown", onEscKeyDownHandler);
    };
  }, []);
  useEffect(() => {
    if (modalClosing) setFadeType("out");
    return () => {
      setModalClosing(false);
    };
  }, [modalClosing, setModalClosing]);

  return createPortal(
    <StyledModal
      id={id}
      className={className}
      role="dialog"
      zIndexBox={typeof zIndexBox === "number" && zIndexBox > 0 ? zIndexBox : 2}
      fadeType={fadeType}
    >
      <div className="modal-box">
        <div className="modal-box__header">
          <h4 className="modal-box__title">{title}</h4>
          <button onClick={closeHandler} className="modal-box__close"></button>
        </div>
        <div className="modal-box__content">{children}</div>
        <div className="modal-box__footer"></div>
      </div>
      <div
        className="modal-background"
        onTransitionEnd={transitionEndHandler}
        onMouseDown={closeHandler}
        onMouseOver={(e) => e.stopPropagation()}
      />
    </StyledModal>,
    document.querySelector("#modal-root")
  );
};

export default memo(Modal);
