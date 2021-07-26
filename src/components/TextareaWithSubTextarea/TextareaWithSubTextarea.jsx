import { nanoid } from "nanoid";
import { useEffect, useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

const StyledTextareaWithSubTextarea = styled.div`
  textarea {
    width: 100%;
    color: #000;
    resize: none;
    padding: 4px;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0);
    border: 1px #999 solid;
    color: #fff;
    border-radius: 3px;
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

  const MARGIN_TOP = 7;

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
    const { value, offsetHeight } = event.target;

    if (inputType === "insertLineBreak") {
      addSubTextarea();
      return;
    }

    setData((prevValue) => {
      const prevValueCopy = Object.assign({}, prevValue);
      prevValueCopy.subTextareas[subTextareaIndex].subTextareaText = value;
      return prevValueCopy;
    });

    if (offsetHeight + 2 !== heightOfEachSubtask[subTextareaIndex]) {
      const heightOfEachSubtaskCopy = heightOfEachSubtask.slice();
      heightOfEachSubtaskCopy[subTextareaIndex] = offsetHeight + 2;
      setHeightOfEachSubtask(heightOfEachSubtaskCopy);
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

  const getPoints = (index, commonAmountOfLines) => {
    const WIDTH_OF_LINES_BOX = 30;

    const DISTANCE_FROM_STARTx =
      WIDTH_OF_LINES_BOX -
      Math.floor(WIDTH_OF_LINES_BOX / (commonAmountOfLines + 1)) * (index + 1);

    const DISTANCE_FROM_STARTy =
      heightOfEachSubtask
        .slice(0, index + 1)
        .reduce((prev, curr) => prev + curr) +
      MARGIN_TOP * (index + 1) -
      Math.floor(heightOfEachSubtask[index] / 2);

    return `${DISTANCE_FROM_STARTx},
    1 ${DISTANCE_FROM_STARTx},
    ${DISTANCE_FROM_STARTy},
    ${WIDTH_OF_LINES_BOX - 2},
    ${DISTANCE_FROM_STARTy}`;
  };

  useEffect(() => {
    onChangeReturnData(data);
  }, [onChangeReturnData, data]);

  return (
    <StyledTextareaWithSubTextarea className={className ? className : ""}>
      <TextareaAutosize
        value={data.textareaText}
        onChange={textareaOnChangeHandler}
        placeholder={placeholder ? placeholder : ""}
        autoFocus
      />
      {data.subTextareas.length !== 0 && (
        <div className="sub-textareas">
          <div className="sub-textareas__lines">
            <svg
              width="100%"
              height={
                heightOfEachSubtask.reduce((prev, curr) => prev + curr) +
                data.subTextareas.length * MARGIN_TOP
              }
            >
              {data.subTextareas.map((subTextarea, index) => {
                return (
                  <polyline
                    key={subTextarea.id}
                    points={getPoints(index, data.subTextareas.length)}
                    fill="none"
                    stroke="#fff"
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
                    value={data.subTextareas[index].subTextareaText}
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
