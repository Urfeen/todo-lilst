import React, { useRef, useState, memo, useEffect } from "react";
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
  const [checkBoxHeight, setCheckBoxHeight] = useState(0);
  const [heightOfEachSubtask, setHeightOfEachSubtask] = useState([]);

  const moreClasses = classNames("more", {
    more_hidden: !isExpanded,
  });
  const EXPAND_DURATION = 200;
  const _MARGIN_TOP = 7;

  const liPrimaryAreaRef = useRef();
  const liMoreRef = useRef();

  const checkboxRef = useRef();
  const checkRef = useRef();
  const subtaskRef = useRef([]);

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
  const getPolylinePoints = () => {
    return "8,0 8,20 16,20";
  };

  useEffect(() => {
    setIsExpanded(true);
    setCheckBoxHeight(
      checkboxRef.current.offsetHeight - checkRef.current.offsetHeight
    );
    setHeightOfEachSubtask();
  }, []);

  // useEffect(() => {
  //   console.log(done);
  // }, [done]);

  return (
    // <a href={'task-' + (index + 1)}>
    <StyledListItem
      className={classNames({
        "list-item_expanded": isExpanded,
      })}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      calcHeight={
        isExpanded
          ? liPrimaryAreaRef.current.offsetHeight +
            liMoreRef.current.offsetHeight +
            20 +
            "px"
          : ""
      }
    >
      <div ref={liPrimaryAreaRef} className="primary-area">
        <div className="paper">
          <div
            className={classNames("task", {
              task_done: done,
            })}
          >
            <div ref={checkboxRef} className="checkbox">
              <InputCheckbox
                checked={done}
                onChange={() => changeTaskStatusHandler(id)}
                ref={checkRef}
              />

              {subtasks.length > 0 && (
                <svg width="100%" height={checkBoxHeight}>
                  {subtasks.map((subtask, index) => {
                    return (
                      <polyline
                        key={subtask.id}
                        points={getPolylinePoints(index)}
                        fill="none"
                        stroke="#fff"
                      />
                    );
                  })}
                  <polyline
                    points="8,20 8,40 16,40"
                    fill="none"
                    stroke="#fff"
                  />
                  <polyline
                    points="8,40 8,60 16,60"
                    fill="none"
                    stroke="#fff"
                  />
                </svg>
              )}
            </div>
            <div className="task-content">
              <span>{taskText}</span>

              {subtasks.length > 0 && (
                <ul className="subtasks">
                  {subtasks.map((subtask) => {
                    return (
                      <li
                        // ref={createNewLiRef()}
                        key={subtask.id}
                        className="task"
                      >
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
