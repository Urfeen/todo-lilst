import { useState } from "react";
import "./DeleteButton.scss";
import classNames from "classnames";

const DeleteButton = ({ text, onClick: action }) => {
  const [del, setDel] = useState(false);

  const onClickHandler = (event) => {
    if (!del) {
      setDel(true);
      setTimeout(() => {
        setDel(false);
        if (typeof action === "function") {
          action();
        }
      }, 3200);
    }
  };

  return (
    <button
      onClick={onClickHandler}
      type="button"
      className={classNames("btn_trash-bin", { delete: del })}
    >
      <div
        style={{
          marginRight: text ? "0.4rem" : 0,
          left: text ? "-2px" : 0,
        }}
        className="trash"
      >
        <div className="top">
          <div className="paper" />
        </div>
        <div className="box"></div>

        <div className="check">
          <svg viewBox="0 0 8 6">
            <polyline points="1 3.4 2.71428571 5 7 1"></polyline>
          </svg>
        </div>
      </div>
      <span>{text && text}</span>
    </button>
  );
};

export default DeleteButton;
