import { memo, useEffect } from "react";
import { createPortal } from "react-dom";
import StyledModal from "./StyledModal.css.js";

const Modal = ({ zIndexBox, children, onClose: close }) => {
  const modalRoot = document.createElement("div");
  modalRoot.id = "modal-root";

  // const transitionEndHandler = e => {
  //   if (e.propertyName !== "opacity" || this.state.fadeType === "in") return;
  //   if (this.state.fadeType === "out") {
  //     this.props.onClose();
  //   }
  // };

  // { fadeType: null };
  // background = React.createRef();
  // componentDidMount() {
  //     window.addEventListener("keydown", this.onEscKeyDown, false);
  //     setTimeout(() => this.setState({ fadeType: "in" }), 0);
  //   }
  // componentDidUpdate(prevProps, prevState) {
  //     if (!this.props.isOpen && prevProps.isOpen) {
  //       this.setState({ fadeType: "out" });
  //     }
  //   }
  // componentWillUnmount() {
  //     window.removeEventListener("keydown", this.onEscKeyDown, false);
  //   }
  // transitionEnd = e => {
  //     if (e.propertyName !== "opacity" || this.state.fadeType === "in") return;
  // if (this.state.fadeType === "out") {
  //       this.props.onClose();
  //     }
  //   };
  // onEscKeyDown = e => {
  //     if (e.key !== "Escape") return;
  //     this.setState({ fadeType: "out" });
  //   };
  // handleClick = e => {
  //     e.preventDefault();
  //     this.setState({ fadeType: "out" });
  //   };
  useEffect(() => {
    document.body.appendChild(modalRoot);
    return () => {
      document.body.removeChild(modalRoot);
    };
  }, [modalRoot]);

  return createPortal(
    <StyledModal
      // id={this.props.id}
      // className={`wrapper ${this.props.class}`}
      role="dialog"
      zIndexBox={parseInt(zIndexBox) ? zIndexBox : 2}
      // onTransitionEnd={this.transitionEnd}
      // fadeType={this.state.fadeType}
    >
      <div className="modal-box">
        <div className="modal-box__header">
          <h4 className="modal-box__title">Title Of Modal</h4>
          <button
            onClick={typeof close === "function" ? close : ""}
            className="modal-box__close"
          ></button>
        </div>
        <div className="modal-box__content">{children}</div>
        <div className="modal-box__footer">footer</div>
      </div>
      <div
        className="modal-background"
        onMouseDown={typeof close === "function" ? close : ""}
        // ref={this.background}
      />
    </StyledModal>,
    modalRoot
  );
};

export default memo(Modal);
