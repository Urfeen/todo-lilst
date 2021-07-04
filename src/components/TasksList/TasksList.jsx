import { useEffect, useState } from "react";
import CreateTask from "./CreateTask/CreateTask.jsx";
import "./TasksList.scss";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  const addTaskHandler = (taskText) => {
    const newTask = {
      taskText,
      done: false,
    }

    setTasks(prevState => prevState.concat(newTask));
  }

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks || tasks.length === 0) return;
    setTasks(tasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <CreateTask addTaskHandler={addTaskHandler} />

      <ul className="tasks-list">
        {tasks.length === 0 ? (
          <span>no one task</span>
        ) : (
          tasks.map((task, index) => (
            <li key={index}>
              <input defaultChecked={task.done} type="checkbox" name="checkbox" />
              <span>{task.taskText}</span>
              <button type="button">&times;</button>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default TasksList;