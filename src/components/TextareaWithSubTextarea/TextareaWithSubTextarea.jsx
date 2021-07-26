import { nanoid } from "nanoid";
import { useEffect, useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

const StyledTextareaWithSubTextarea = styled.div`
  textarea {
    width: 100%;
    resize: none;
    padding: 4px;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0);
    border: 1px #ccc solid;
    color: #ccc;
    transition: border 0.2s ease, color 0.2s ease;
    border-radius: 3px;
  }
  textarea:focus {
    border: 1px #fff solid;
    color: #fff;
  }
  .sub-textareas {
    display: flex;
    &__lines {
      width: 30px;
    }
    &__list {
      flex: 1 1 auto;
      li {
        margin: 7px 0 0 0;
      }
    }
  }
`;

const TextareaWithSubTextarea = ({
  className,
  onChangeGetData: onChangeReturnData,
  placeholder,
}) => {
  const [data, setData] = useState({ textareaText: "", subTextareas: [] });
  const [heightOfEachSubtask, setHeightOfEachSubtask] = useState([]);
  const [focusLineIndex, setFocusLineIndex] = useState(null);

  const _MARGIN_TOP = 7;

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

  const getPoints = (index, commonAmountOfLines) => {
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
          <div className="sub-textareas__lines">
            <svg
              width="100%"
              height={
                heightOfEachSubtask.reduce((prev, curr) => prev + curr) +
                data.subTextareas.length * _MARGIN_TOP
              }
            >
              {data.subTextareas.map((subTextarea, index) => {
                return (
                  <polyline
                    key={subTextarea.id}
                    points={getPoints(index, data.subTextareas.length)}
                    fill="none"
                    stroke={focusLineIndex === index ? "#fff" : "#999"}
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
