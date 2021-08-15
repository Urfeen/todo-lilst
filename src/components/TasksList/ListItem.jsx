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
  const subtasksRef = useRef([]);

  let mouseEnterTimeoutId = useRef();
  let mouseLeaveTimeoutId = useRef();

  const onMouseEnterHandler = () => {
    if (mouseLeaveTimeoutId.current) clearTimeout(mouseLeaveTimeoutId.current);

    mouseEnterTimeoutId.current = setTimeout(() => { }, EXPAND_DURATION);

    setIsExpanded(true);
  };
  const onMouseLeaveHandler = () => {
    if (mouseEnterTimeoutId.current) clearTimeout(mouseEnterTimeoutId.current);

    mouseLeaveTimeoutId.current = setTimeout(() => { }, EXPAND_DURATION);

    setIsExpanded(false);
  };
  const getPolylinePoints = (index, isDone) => {
    if (heightOfEachSubtask.length === 0) return;

    const boxWidth = checkboxRef.current.offsetWidth;
    const DISTANCE_FROM_STARTy =
      heightOfEachSubtask
        .slice(0, index + 1)
        .reduce((prev, curr) => prev + curr) +
      _MARGIN_TOP * (index + 1) -
      Math.floor(heightOfEachSubtask[index] - _MARGIN_TOP);

    return `${boxWidth / 2},${DISTANCE_FROM_STARTy -
      (heightOfEachSubtask[index - 1] || _MARGIN_TOP) -
      _MARGIN_TOP
      } ${boxWidth / 2},
    ${DISTANCE_FROM_STARTy} ${boxWidth},${DISTANCE_FROM_STARTy}`;
  };

  useEffect(() => {
    setIsExpanded(true);
    setHeightOfEachSubtask(
      subtasksRef.current.map((subtask) => subtask.offsetHeight)
    );
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
                <svg
                  width="100%"
                  height={
                    checkboxRef.current
                      ? checkboxRef.current.offsetHeight -
                      checkRef.current.offsetHeight -
                      2
                      : 0
                  }
                >
                  {subtasks.map((subtask, index) => {
                    return (
                      <polyline
                        key={subtask.id}
                        points={getPolylinePoints(index, subtask.done)}
                        fill="none"
                        stroke="#fff"
                      />
                    );
                  })}
                </svg>
              )}
            </div>
            <div className="task-content">
              <span>{taskText}</span>

              {subtasks.length > 0 && (
                <ul className="subtasks">
                  {subtasks.map((subtask, index) => {
                    return (
                      <li
                        ref={(tag) => (subtasksRef.current[index] = tag)}
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
