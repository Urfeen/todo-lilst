import React, { useRef, useState, memo } from "react";
import classNames from "classnames";
import moment from "moment";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import InputCheckbox from "../InputCheckbox/InputCheckbox.jsx";
import StyledListItem from "./StyledListItem.style.js";

const ListItem = ({
  id,
  done,
  taskText,
  changeTaskStatusHandler,
  deleteTaskHandler,
  creationDate,
  index,
  subtasks,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const moreClasses = classNames("more", {
    more_hidden: !isExpanded,
  });
  const EXPAND_DURATION = 200;

  const liPrimaryAreaRef = useRef();
  const liMoreRef = useRef();
  let mouseEnterTimeoutId = useRef();
  let mouseLeaveTimeoutId = useRef();

  const onMouseEnterHandler = () => {
    if (mouseLeaveTimeoutId.current) clearTimeout(mouseLeaveTimeoutId.current);

    mouseEnterTimeoutId.current = setTimeout(() => {}, EXPAND_DURATION);

    setIsExpanded(true);
  };
  const onMouseLeaveHandler = () => {
    if (mouseEnterTimeoutId.current) clearTimeout(mouseEnterTimeoutId.current);

    mouseLeaveTimeoutId.current = setTimeout(() => {}, EXPAND_DURATION);

    setIsExpanded(false);
  };

  return (
    // <a href={'task-' + (index + 1)}>
    <StyledListItem
      className={classNames({
        "list-item_expanded": isExpanded,
      })}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      style={{
        height: isExpanded
          ? liPrimaryAreaRef.current.offsetHeight +
            liMoreRef.current.offsetHeight +
            20 +
            "px"
          : "",
      }}
    >
      <div ref={liPrimaryAreaRef} className="primary-area">
        <div className="paper">
          <div
            className={classNames("task", {
              task_done: done,
            })}
          >
            <div className="checkbox">
              <InputCheckbox
                checked={done}
                onChange={() => changeTaskStatusHandler(id)}
              />

              {/* <svg width="100%" height={42}>
                <polyline points="8,0 8,20 16,20" fill="none" stroke="#fff" />
                <polyline points="8,0 8,40 16,40" fill="none" stroke="#fff" />
              </svg> */}
            </div>
            <div className="task-content">
              <span>{taskText}</span>

              {subtasks.length > 0 && (
                <ul className="subtasks">
                  {subtasks.map((subtask) => {
                    return (
                      <li key={subtask.id} className="task">
                        <div className="checkbox">
                          <InputCheckbox
                            checked={subtask.done}
                            onChange={() =>
                              changeTaskStatusHandler(id, subtask.id)
                            }
                          />
                        </div>
                        <div className="task-content">
                          <span>{subtask.text}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div ref={liMoreRef} className={moreClasses}>
        <DeleteButton text="text" /*onClick={() => deleteTaskHandler(id)}*/ />
        <span>Start - {moment(creationDate).format("DD.MM.YY")}</span>
      </div>
    </StyledListItem>
    // </a>
  );
};

export default memo(ListItem);
