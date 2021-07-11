import { memo } from "react";
import "./InputCheckbox.scss";

const InputCheckbox = ({ defaultChecked, onChange: action }) => {
  return (
    <div className="check">
      <input
        defaultChecked={defaultChecked}
        onChange={typeof action === 'function' ? action : ''}
        type="checkbox"
        className="check__input"
      />
      <span className="check__box"></span>
    </div>
  );
}

export default memo(InputCheckbox);