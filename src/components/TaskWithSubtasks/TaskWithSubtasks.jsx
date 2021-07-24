import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

const StyledTaskWithSubtasks = styled.div`
  textarea {
    width: 100%;
    color: #000;
    resize: none;
    padding: 0.3rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, 0);
    border: 1px #fff solid;
    color: #fff;
  }
`;

const TaskWithSubtasks = ({ className }) => {
  const textarea = useRef();
  const [taskText, setTaskText] = useState({ text: "" });

  const onChangeHandler = (event) => {
    const inputType = event.nativeEvent.inputType;
    const value = event.target.value;

    if (inputType === "insertLineBreak") {
      console.log("yes");
      event.preventDefault();
    }
    setTaskText({ ...taskText, text: value });
  };

  useEffect(() => {
    textarea.current.focus();
  }, []);

  return (
    <StyledTaskWithSubtasks className={className ? className : ""}>
      <TextareaAutosize
        value={taskText.text}
        onChange={onChangeHandler}
        placeholder='Press "Enter" to create a subtask'
        ref={(tag) => (textarea.current = tag)}
      />
    </StyledTaskWithSubtasks>
  );
};

export default TaskWithSubtasks;
