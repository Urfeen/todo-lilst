import { useState } from "react";
import "./PopUp.scss";

const CreateTask = ({ addTaskHandler }) => {
  const [taskText, setTaskText] = useState("");

  const changeHandler = event => {
    const { value } = event.target;
    setTaskText(value);
  }
  const submitFormHandler = event => {
    event.preventDefault();
    addTaskHandler(taskText);
    setTaskText("");
  }

  return (
    <form onSubmit={submitFormHandler} name="createTask" action="#">
      <input value={taskText} onChange={changeHandler} type="text" name="createTaskInput" />
      <button type="submit">create</button>
      {/* <button
          onClick={() => deleteTaskHandler(id)}
          type="button"
          className="btn_cross"
          style={{ height: "1.5rem", width: "1.5rem" }}
        /> */}
    </form>
  );
}

export default CreateTask;