import { useState } from "react";

const CreateTask = ({ addTaskHandler }) => {
  const [taskText, setTaskText] = useState("");

  const changeHandler = (event) => {
    const { value } = event.target;
    setTaskText(value);
  }
  const submitFormHandler = (event) => {
    event.preventDefault();
    addTaskHandler(taskText);
    setTaskText("");
  }

  return (
    <form onSubmit={submitFormHandler} name="createTask" action="#">
      <input value={taskText} onChange={changeHandler} type="text" name="createTaskInput" />
      <button type="submit">create</button>
    </form>
  );
}

export default CreateTask;