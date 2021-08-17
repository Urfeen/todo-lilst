import React, { useRef, useState, memo, useEffect } from "react";
import classNames from "classnames";
import moment from "moment";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import InputCheckbox from "../InputCheckbox/InputCheckbox.jsx";
import StyledListItem from "./StyledListItem.style.js";

const ListItem = ({
  id: listItemId,
  done,
  taskText,
  changeTaskStatusHandler,
  deleteTaskHandler,
  creationDate,
  index: listItemIndex,
  subtasks,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [heightOfEachSubtask, setHeightOfEachSubtask] = useState([]);
  const [focusVisualNavIndex, setFocusVisualNavIndex] = useState(null);

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
  const getPolylinePoints = (index) => {
    if (heightOfEachSubtask.length === 0) return;

    const boxWidth = checkboxRef.current.offsetWidth;
    const DISTANCE_FROM_STARTy =
      heightOfEachSubtask
        .slice(0, index + 1)
        .reduce((prev, curr) => prev + curr) +
      _MARGIN_TOP * (index + 1) -
      Math.floor(heightOfEachSubtask[index] - _MARGIN_TOP);

    if (index === focusVisualNavIndex) {
      return `${boxWidth / 2},0 ${boxWidth / 2},
      ${DISTANCE_FROM_STARTy} ${boxWidth},${DISTANCE_FROM_STARTy}`;
    }

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
    if (focusVisualNavIndex !== null && focusVisualNavIndex !== "head") {
      subtasksRef.current[focusVisualNavIndex].childNodes[0].childNodes[0].childNodes[0].focus();
    }
  }, [subtasks, focusVisualNavIndex]);


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
                onChange={() => changeTaskStatusHandler(listItemId)}
                ref={checkRef}
                onBlur={() => setFocusVisualNavIndex(null)}
                onFocus={() => {
                  setFocusVisualNavIndex("head");
                }}
                id={`task-${listItemId}`}
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
                        points={getPolylinePoints(index)}
                        fill="none"
                        stroke={focusVisualNavIndex === index ? "#5c86ff" : "#a3a3a3a0"}
                        className={classNames({ "focusing": focusVisualNavIndex === index })}
                      />
                    );
                  })}
                </svg>
              )}
            </div>
            <div className={classNames("task-content", { "head-focusing": focusVisualNavIndex === "head" })}>
              <label onClick={() => changeTaskStatusHandler(listItemId)} htmlFor={`task-${listItemId}`}>
                <span>{taskText}</span>
              </label>

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
                            onChange={() => {
                              changeTaskStatusHandler(listItemId, subtask.id, listItemIndex)
                            }
                            }
                            onBlur={() => setFocusVisualNavIndex(null)}
                            onFocus={() => {
                              setFocusVisualNavIndex(index);
                            }}
                            id={`subtask-${subtask.id}`}
                          />
                        </div>
                        <div className="task-content">
                          <label
                            onClick={() => {
                              changeTaskStatusHandler(listItemId, subtask.id, listItemIndex)
                            }}
                            htmlFor={`subtask-${subtask.id}`}
                          >
                            <span className={classNames({ "task-content_focusing": focusVisualNavIndex === index })}>
                              {subtask.text}
                            </span>
                          </label>
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
    </StyledListItem >
    // </a>
  );
};

export default memo(ListItem);
