import React, { useRef, useState, memo, useEffect } from "react";
import classNames from "classnames";
import moment from "moment";
import InputCheckbox from "../InputCheckbox/InputCheckbox.jsx";
import StyledListItem from "./StyledListItem.style.js";
import styled from "styled-components";
import Confirm from '../Confirm/Confirm.jsx';

const StyledHiddenCheckbox = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const ListItem = ({
  id: listItemId,
  done,
  taskText,
  changeTaskStatusHandler,
  deleteTaskHandler,
  startDate,
  endDate,
  index: listItemIndex,
  subtasks,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [heightOfEachSubtask, setHeightOfEachSubtask] = useState([]);
  const [focusVisualNavIndex, setFocusVisualNavIndex] = useState(null);
  const [isListItemFocus, setIsListItemFocus] = useState(false);

  const _MARGIN_TOP = 7;

  const liPrimaryAreaRef = useRef();
  const liMoreRef = useRef();

  const checkboxRef = useRef();
  const checkRef = useRef();
  const subtasksRef = useRef([]);

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
    setHeightOfEachSubtask(
      subtasksRef.current.map((subtask) => subtask.offsetHeight)
    );
    if (focusVisualNavIndex !== null && focusVisualNavIndex !== "head") {
      const subtaskInputCheckbox = subtasksRef.current[focusVisualNavIndex].childNodes[0].childNodes[0].childNodes[0];
      subtaskInputCheckbox.focus();
    }
  }, [subtasks, focusVisualNavIndex]);

  return (
    <StyledListItem
      isListItemFocus={isListItemFocus}
      calcHeight={
        isExpanded
          ? liPrimaryAreaRef.current.offsetHeight +
          liMoreRef.current.offsetHeight + 20
          : ""
      }
      isExpanded={isExpanded}
      onClickCapture={!isExpanded ? ((e) => {
        setIsExpanded(true);
        e.stopPropagation();
      }) : null}
    >

      {!isExpanded && (
        <StyledHiddenCheckbox
          onFocus={() => setIsListItemFocus(true)}
          onBlur={() => setIsListItemFocus(false)}
          onChange={() => setIsExpanded(true)}
          type="checkbox"
        />
      )}

      <div ref={liPrimaryAreaRef} className="primary-area">
        <div className={classNames("paper", { "paper_expanded": isExpanded })}>
          <div className={classNames("task", { task_done: done, })}>
            <div ref={checkboxRef} className="checkbox">
              <InputCheckbox
                checked={done}
                onChange={() => changeTaskStatusHandler(listItemId)}
                ref={checkRef}
                onBlur={() => setFocusVisualNavIndex(null)}
                onFocus={() => {
                  setFocusVisualNavIndex("head");
                }}
                tabIndex={isExpanded ? 0 : -1}
                id={`task-${listItemId}`}
              />

              {subtasks.length > 0 && (
                <svg
                  width="100%"
                  height={
                    checkboxRef.current
                      ? checkboxRef.current.offsetHeight - checkRef.current.offsetHeight - 5
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
                            onChange={() => changeTaskStatusHandler(listItemId, subtask.id, listItemIndex)}
                            onBlur={() => setFocusVisualNavIndex(null)}
                            onFocus={() => {
                              setFocusVisualNavIndex(index);
                            }}
                            tabIndex={isExpanded ? 0 : -1}
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
                            <span
                              className={classNames(
                                {
                                  "task-content_focusing": focusVisualNavIndex === index,
                                  "task-content_done": subtasks[index].done
                                })
                              }>
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

      <div
        ref={liMoreRef}
        className={classNames("more", {
          more_hidden: !isExpanded,
        })}
      >
        <Confirm
          declineTabIndex={isExpanded ? 0 : -1}
          acceptTabIndex={isExpanded ? 0 : -1}
          onDecline={() => deleteTaskHandler(listItemId)}
          onAccept={() => setIsExpanded(false)}
          type="button"
          declineText="Delete"
          acceptText="Shrink"
        />
        <div className="more__time">
          <span>
            Start - {moment(startDate).format("DD.MM.YY")}
          </span>
          <span>
            End - {endDate ? moment(endDate).format("DD.MM.YY") : 'Not yet'}
          </span>
        </div>
      </div>
    </StyledListItem >
  );
};

export default memo(ListItem);
