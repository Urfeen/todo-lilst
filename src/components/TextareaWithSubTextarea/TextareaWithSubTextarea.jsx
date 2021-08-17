import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import StyledTextareaWithSubTextarea from "./TextareaWithSubTextarea.css.js";
import classNames from "classnames";

const TextareaWithSubTextarea = ({
  className,
  onChangeGetData: onChangeReturnData,
  placeholder,
  subPlaceholder,
  showLines,
}) => {
  const [data, setData] = useState({ textareaText: "", subTextareas: [] });
  const [heightOfEachSubtask, setHeightOfEachSubtask] = useState([]);
  const [focusVisualNavIndex, setFocusVisualNavIndex] = useState(null);
  const refs = useRef({ mainTextareaTag: null, subTextareaTags: [] });

  const _MARGIN_TOP = 7;
  const _MAX_AMOUNT_OF_LINES = 6;

  const textareaOnChangeHandler = (event) => {
    event.preventDefault();
    const inputType = event.nativeEvent.inputType;
    const value = event.target.value;

    if (inputType === "insertLineBreak") {
      addSubTextarea();
      return;
    }

    setData({ ...data, textareaText: value });
  };
  const subTextareaOnChangeHandler = (event, subTextareaIndex) => {
    event.preventDefault();
    const inputType = event.nativeEvent.inputType;
    const value = event.target.value;

    if (inputType === "insertLineBreak") {
      addSubTextarea();
      return;
    }

    setData((prevValue) => {
      const prevValueCopy = Object.assign({}, prevValue);
      prevValueCopy.subTextareas[subTextareaIndex].subTextareaText = value;
      return prevValueCopy;
    });
  };

  const onKeyDownSubTextareaHandler = (event, subTextareaIndex) => {
    if (
      event.code === "Backspace" &&
      data.subTextareas[subTextareaIndex].subTextareaText === ""
    ) {
      if (subTextareaIndex > 0) {
        refs.current.subTextareaTags[subTextareaIndex - 1].focus();
      } else refs.current.mainTextareaTag.focus();

      setData((prevValue) => {
        const prevSubTextareasCopy = prevValue.subTextareas.slice();
        const newSubTextareas = prevSubTextareasCopy.filter(
          (_, index) => index !== subTextareaIndex
        );

        return { ...prevValue, subTextareas: newSubTextareas };
      });
    }
  };

  const addSubTextarea = () => {
    const newSubTextareas = data.subTextareas.slice().concat({
      subTextareaText: "",
      id: nanoid(),
    });

    const HEIGHT_OF_INPUT_AREA = 28;
    setHeightOfEachSubtask([...heightOfEachSubtask, HEIGHT_OF_INPUT_AREA]);

    setData({
      ...data,
      subTextareas: newSubTextareas,
      textareaText:
        data.textareaText.trim() === ""
          ? "List of subtasks"
          : data.textareaText,
    });
  };

  const getLinesPoints = (index, commonAmountOfLines) => {
    const WIDTH_OF_LINES_BOX = 30;

    const DISTANCE_FROM_STARTx =
      WIDTH_OF_LINES_BOX -
      Math.floor(WIDTH_OF_LINES_BOX / (commonAmountOfLines + 1)) * (index + 1);

    const DISTANCE_FROM_STARTy =
      heightOfEachSubtask
        .slice(0, index + 1)
        .reduce((prev, curr) => prev + curr) +
      _MARGIN_TOP * (index + 1) -
      Math.floor(heightOfEachSubtask[index] / 2);

    return `${DISTANCE_FROM_STARTx},
    1 ${DISTANCE_FROM_STARTx},
    ${DISTANCE_FROM_STARTy},
    ${WIDTH_OF_LINES_BOX - 2},
    ${DISTANCE_FROM_STARTy}`;
  };

  const getCircleCoords = (index) => {
    const WIDTH_OF_CIRCLES_BOX = 30;
    const MARGIN_RIGHT = 2;

    const DISTANCE_FROM_STARTx = WIDTH_OF_CIRCLES_BOX / 2 - MARGIN_RIGHT;

    const DISTANCE_FROM_STARTy =
      heightOfEachSubtask
        .slice(0, index + 1)
        .reduce((prev, curr) => prev + curr) +
      _MARGIN_TOP * (index + 1) -
      Math.floor(heightOfEachSubtask[index] / 2);

    const cx = DISTANCE_FROM_STARTx;
    const cy = DISTANCE_FROM_STARTy;
    const r = 4;

    return { cx, cy, r };
  };

  useEffect(() => {
    refs.current = {
      mainTextareaTag: refs.current.mainTextareaTag,
      subTextareaTags: refs.current.subTextareaTags.filter(
        (subTag) => subTag !== null
      ),
    };

    const newHeightOfEachSubtask = refs.current.subTextareaTags.map(
      (subTextareaTag) => {
        return subTextareaTag.offsetHeight + 2;
      }
    );

    setHeightOfEachSubtask(newHeightOfEachSubtask);
    onChangeReturnData(data);
  }, [onChangeReturnData, data]);

  return (
    <StyledTextareaWithSubTextarea className={className ? className : ""}>
      <TextareaAutosize
        value={data.textareaText}
        onChange={textareaOnChangeHandler}
        placeholder={placeholder ?? 'Press "Enter" to create a subtask'}
        ref={(tag) => (refs.current.mainTextareaTag = tag)}
        autoFocus
      />
      {data.subTextareas.length !== 0 && (
        <div className="sub-textareas">
          <div className="sub-textareas__visual-nav">
            <svg
              width="100%"
              height={
                heightOfEachSubtask.reduce((prev, curr) => prev + curr) +
                heightOfEachSubtask.length * _MARGIN_TOP
              }
            >
              {showLines && data.subTextareas.length <= _MAX_AMOUNT_OF_LINES
                ? data.subTextareas.map((subTextarea, index) => {
                  return (
                    <polyline
                      points={getLinesPoints(index, data.subTextareas.length)}
                      key={subTextarea.id}
                      fill="none"
                      className={classNames({ "focusing": focusVisualNavIndex === index })}
                      stroke={
                        focusVisualNavIndex === index ? "#5c86ff" : "#a3a3a3a0"
                      }
                    />
                  );
                })
                : data.subTextareas.map((subTextarea, index) => {
                  return (
                    <circle
                      {...getCircleCoords(index)}
                      key={subTextarea.id}
                      stroke={
                        focusVisualNavIndex === index ? "#5c86ff" : "#99999970"
                      }
                      strokeWidth={2}
                      fill={
                        focusVisualNavIndex === index ? "#5c86ff" : "none"
                      }
                    />
                  );
                })}
            </svg>
          </div>
          <ul className="sub-textareas__list">
            {data.subTextareas.map((subTextarea, index) => {
              return (
                <li key={subTextarea.id}>
                  <TextareaAutosize
                    onChange={(event) =>
                      subTextareaOnChangeHandler(event, index)
                    }
                    onBlur={() => setFocusVisualNavIndex(null)}
                    onFocus={() => {
                      setFocusVisualNavIndex(index);
                    }}
                    onKeyDown={(event) =>
                      onKeyDownSubTextareaHandler(event, index)
                    }
                    value={data.subTextareas[index].subTextareaText}
                    ref={(tag) => (refs.current.subTextareaTags[index] = tag)}
                    placeholder={
                      subPlaceholder ?? 'Press "Backspace" to delete subtask'
                    }
                    autoFocus
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </StyledTextareaWithSubTextarea>
  );
};

export default TextareaWithSubTextarea;
