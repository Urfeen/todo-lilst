import { memo, useEffect } from "react";
import "./Modal.scss";
import { createPortal } from "react-dom";

const Modal = ({ children, onClose: close }) => {
  const modalRoot = document.createElement('div');

  useEffect(() => {
    document.body.appendChild(modalRoot);
    return () => {
      document.body.removeChild(modalRoot);
    }
  }, [modalRoot]);

  return (
    createPortal(
      <div>{children}</div>,
      modalRoot
    )
  )
}

export default memo(Modal);