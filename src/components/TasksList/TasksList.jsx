import { useEffect, useState } from "react";
import CreateTask from "./CreateTask/CreateTask.jsx";
import "./TasksList.scss";
import { nanoid } from "nanoid";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  const addTaskHandler = taskText => {
    const newTask = {
      taskText,
      done: false,
      id: nanoid()
    }

    setTasks(prevState => prevState.concat(newTask));
  }
  const changeTaskStatusHandler = taskId => {
    setTasks(prevState => {
      const updatedList = prevState.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            done: !task.done
          }
        }
        return task;
      });
      return updatedList;
    });
  }
  const deleteTaskHandler = taskId => {
    setTasks(prevState => {
      const updatedList = prevState.filter(task => task.id !== taskId);
      return updatedList;
    });
  }

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks || tasks.length === 0) return;
    setTasks(tasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  console.log("yes");
  return (
    <>
      <CreateTask addTaskHandler={addTaskHandler} />

      <ul className="tasks-list">
        {tasks.length === 0 ? (
          <span>no one task</span>
        ) : (
          tasks.map(task => (
            <li key={task.id}>
              <input
                defaultChecked={task.done}
                onChange={() => changeTaskStatusHandler(task.id)}
                type="checkbox"
                name="checkbox"
                className="checkbox"
              />
              <span>{task.taskText}</span>
              <button
                onClick={() => deleteTaskHandler(task.id)}
                type="button"
                className="btn-cross"
              ></button>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default TasksList;