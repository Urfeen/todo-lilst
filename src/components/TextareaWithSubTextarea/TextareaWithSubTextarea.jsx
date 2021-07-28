import { nanoid } from "nanoid";
import { useEffect, useState, useRef, useMemo } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

const StyledTextareaWithSubTextarea = styled.div`
  textarea {
    width: 100%;
    resize: none;
    padding: 4px;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0);
    border: 1px #2b3044 solid;
    color: #ccc;
    transition: border 0.2s ease, color 0.2s ease;
    border-radius: 3px;
  }
  textarea:focus {
    border: 1px #395ac0 solid;
    color: #fff;
  }
  .sub-textareas {
    display: flex;
    &__visual-nav {
      width: 30px;
      polyline {
        transition: stroke 0.2s ease;
      }
    }
    &__list {
      flex: 1 1 auto;
      li {
        margin: 7px 0 0 0;
      }
      textarea {
        font-size: 14px;
      }
    }
  }
`;

const TextareaWithSubTextarea = ({
  className,
  onChangeGetData: onChangeReturnData,
  placeholder,
  subPlaceholder,
  showLines,
}) => {
  const [data, setData] = useState({ textareaText: "", subTextareas: [] });
  const [heightOfEachSubtask, setHeightOfEachSubtask] = useState([]);
  const [focusLineIndex, setFocusLineIndex] = useState(null);

  const _MARGIN_TOP = 7;
  const MAX_AMOUNT_OF_LINES = 9;

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
    const newHeightOfEachSubtask = data.subTextareas.map((subTextarea) => {
      return subTextarea.tag.offsetHeight + 2;
    });
    setHeightOfEachSubtask(newHeightOfEachSubtask);
    onChangeReturnData(data);
  }, [onChangeReturnData, data]);

  return (
    <StyledTextareaWithSubTextarea className={className ? className : ""}>
      <TextareaAutosize
        value={data.textareaText}
        onChange={textareaOnChangeHandler}
        onFocus={() => setFocusLineIndex(null)}
        placeholder={placeholder ? placeholder : ""}
        ref={(tag) => (data.tag = tag)}
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
              {showLines && data.subTextareas.length <= MAX_AMOUNT_OF_LINES
                ? data.subTextareas.map((subTextarea, index) => {
                    return (
                      <polyline
                        points={getLinesPoints(index, data.subTextareas.length)}
                        key={subTextarea.id}
                        fill="none"
                        stroke={focusLineIndex === index ? "#5c86ff" : "#999"}
                      />
                    );
                  })
                : data.subTextareas.map((subTextarea, index) => {
                    return (
                      <circle
                        {...getCircleCoords(index)}
                        key={subTextarea.id}
                        stroke={focusLineIndex === index ? "#5c86ff" : "#999"}
                        strokeWidth={2}
                        fill={focusLineIndex === index ? "#5c86ff" : "none"}
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
                    onFocus={() => setFocusLineIndex(index)}
                    value={data.subTextareas[index].subTextareaText}
                    ref={(tag) => (data.subTextareas[index].tag = tag)}
                    placeholder={subPlaceholder ? subPlaceholder : ""}
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
