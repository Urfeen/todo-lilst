import React, { memo, useEffect, useState } from "react";
import TasksList from "./TasksList/TasksList.jsx";
import "./TodoList.scss";
import Modal from "./Modal/Modal.jsx";
import TextareaWithSubTextarea from "./TextareaWithSubTextarea/TextareaWithSubTextarea.jsx";
import AddButton from "../components/AddButton/AddButton.jsx";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [textareaData, setTextareaData] = useState();
  const [textareaErrors, setTextareaErrors] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };
  const checkTextAreaFields = () => {
    const errors = {};
    if (!textareaData.textareaText.trim()) errors.textAreaError = true;
    else errors.textAreaError = false;

    errors.subTextareasError = textareaData.subTextareas.map((subTextarea) => {
      return !subTextarea.subTextareaText;
    });

    if (errors.textAreaError || errors.subTextareasError.find((flag) => flag)) {
      setTextareaErrors(errors);
    }
  };
  const addTaskHandler = (event) => {
    event.preventDefault();
    checkTextAreaFields();
    // if(textareaData.textareaText.trim())
    // console.log(textareaData);
    // w: { text: "", id: nanoid(), subtasks: [] }
    // const newTask = {
    //   ...tasks,
    //   creationDate: Date.now(),
    // };

    // setTasks((prevState) => {
    //   const arrCopy = [...prevState];
    //   arrCopy.unshift(newTask);
    //   return arrCopy;
    // });
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
          className="todo-list__add-todo-btn"
          size="2rem"
          onClick={toggleModalHandler}
        />
        {isModalOpen && (
          <Modal
            title="Create new task"
            zIndexBox={2}
            onClose={toggleModalHandler}
          >
            <form onSubmit={addTaskHandler}>
              <TextareaWithSubTextarea
                subPlaceholder="Type something here..."
                showLines={true}
                onChangeGetData={setTextareaData}
                errors={textareaErrors}
              />
              <AddButton />
            </form>
          </Modal>
        )}
      </header>
      <div className="todo-list__todos">
        {tasks.length !== 0 ? (
          <TasksList
            tasks={tasks}
            changeTaskStatusHandler={changeTaskStatusHandler}
            deleteTaskHandler={deleteTaskHandler}
          />
        ) : (
          <span>no one task</span>
        )}
      </div>
    </div>
  );
};

export default memo(TodoList);
