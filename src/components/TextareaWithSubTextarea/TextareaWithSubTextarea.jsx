import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
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
  }
  .sub-textareas {
    display: flex;
    &__lines {
      width: 24px;
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

  const onChangeHandler = (event) => {
    event.preventDefault();
    const inputType = event.nativeEvent.inputType;
    const value = event.target.value;

    if (inputType === "insertLineBreak") {
      addSubTextarea();
      return;
    }

    setData({ ...data, textareaText: value });
  };

  const addSubTextarea = () => {
    const newSubTextareas = data.subTextareas.slice().concat({
      subTextareaText: "",
      id: nanoid(),
    });

    if (data.textareaText.trim() === "") {
      setData({
        ...data,
        textareaText: "ListList of subtasks",
        subTextareas: newSubTextareas,
      });
      return;
    }

    setData({ ...data, subTextareas: newSubTextareas });
  };

  const getPoints = (index, commonAmountOfLines) => {
    const WIDTH_OF_LINES_BOX = 24;
    return "12,1 12,50 22,50";
  };

  useEffect(() => {
    onChangeReturnData(data);
  }, [data, onChangeReturnData]);

  return (
    <StyledTextareaWithSubTextarea className={className ? className : ""}>
      <TextareaAutosize
        value={data.textareaText}
        onChange={onChangeHandler}
        placeholder={placeholder ? placeholder : ""}
        autoFocus
      />
      {data.subTextareas.length !== 0 && (
        <div className="sub-textareas">
          <div className="sub-textareas__lines">
            <svg width="100%">
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
            {data.subTextareas.map((subTextarea) => {
              return (
                <li key={subTextarea.id}>
                  <TextareaAutosize autoFocus />
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
