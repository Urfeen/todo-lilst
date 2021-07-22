import TasksList from "./TasksList/TasksList.jsx";
import "./TodoList.scss";
import Modal from "./Modal/Modal.jsx";
import { nanoid } from "nanoid";
import { memo, useEffect, useState } from "react";
import InputText from "./InputText/InputText.jsx";
import AddButton from "../components/AddButton/AddButton.jsx";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addTaskHandler = (taskText) => {
    const newTask = {
      taskText: taskText.trim(),
      done: false,
      id: nanoid(),
      creationDate: Date.now(),
    };

    setTasks((prevState) => {
      const arrCopy = [...prevState];
      arrCopy.unshift(newTask);
      return arrCopy;
    });
  };
  const changeTaskStatusHandler = (taskId) => {
    setTasks((prevState) => {
      const updatedList = prevState.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            done: !task.done,
          };
        }
        return task;
      });
      return updatedList;
    });
  };
  const deleteTaskHandler = (taskId) => {
    setTasks((prevState) => {
      const updatedList = prevState.filter((task) => task.id !== taskId);
      return updatedList;
    });
  };

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks || tasks.length === 0) return;
    setTasks(tasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="todo-list">
      <header>
        <h1>Todo list</h1>
        <AddButton
          className="todo-list__add-todo"
          size="2rem"
          onClick={toggleModalHandler}
        />
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={toggleModalHandler}>
            <InputText addTaskHandler={addTaskHandler} />
          </Modal>
        )}
      </header>
      <TasksList
        tasks={tasks}
        changeTaskStatusHandler={changeTaskStatusHandler}
        deleteTaskHandler={deleteTaskHandler}
      />
    </div>
  );
};

export default memo(TodoList);
