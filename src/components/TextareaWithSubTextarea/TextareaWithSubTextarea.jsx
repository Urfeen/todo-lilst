import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

const StyledTextareaWithSubTextarea = styled.div`
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

const TextareaWithSubTextarea = ({ className }) => {
  const textarea = useRef();
  const [task, setTask] = useState({ text: "", id: nanoid(), subtask: [] });

  const onChangeHandler = (event) => {
    event.preventDefault();
    const inputType = event.nativeEvent.inputType;
    const value = event.target.value;

    if (inputType === "insertLineBreak") {
      addSubtask();
      return;
    }

    setTask({ ...task, text: value });
  };

  const addSubtask = () => {
    const subtasksCopy = task.subtask.slice();
    subtasksCopy.push({
      text: "",
      done: false,
      id: nanoid(),
    });
    setTask({ ...task });
  };

  useEffect(() => {
    textarea.current.focus();
  }, []);

  return (
    <StyledTextareaWithSubTextarea className={className ? className : ""}>
      <TextareaAutosize
        value={task.text}
        onChange={onChangeHandler}
        placeholder='Press "Enter" to create a subtask'
        ref={(tag) => (textarea.current = tag)}
      />
      {task.subtasks.length !== 0 && (
        <ul className="subtasks">
          {task.subtasks.map((subtask) => {
            return <li></li>;
          })}
        </ul>
      )}
    </StyledTextareaWithSubTextarea>
  );
};

export default TextareaWithSubTextarea;
