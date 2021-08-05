import React, { memo, useEffect, useState } from "react";
import TasksList from "./TasksList/TasksList.jsx";
import "./TodoList.scss";
import Modal from "./Modal/Modal.jsx";
import TextareaWithSubTextarea from "./TextareaWithSubTextarea/TextareaWithSubTextarea.jsx";
import { nanoid } from "nanoid";
import styled from "styled-components";
import AddButton from "./AddButton/AddButton.jsx";
import Confirm from "./Confirm/Confirm.jsx";

const StyledConfirmBox = styled.div`
  display: flex;
  align-items: center;
  div:nth-child(2) {
    margin: 0px 0px 0px 0.6rem;
    span {
      font-size: 1rem;
      color: #ebe71fcf;
    }
  }
`;

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [textareaData, setTextareaData] = useState();
  const [emptyFieldMessage, setEmptyFieldMessage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const isTextareaHasEmptyFields = () => {
    if (!textareaData.textareaText.trim()) return true;

    const emptySubTextarea = textareaData.subTextareas.find((subTextarea) => {
      return !subTextarea.subTextareaText.trim();
    });

    if (emptySubTextarea) return true;

    return false;
  };

  const addTaskHandler = (event) => {
    event.preventDefault();

    if (isTextareaHasEmptyFields()) {
      const message = "You must fill in all empty fields";
      setEmptyFieldMessage(message);
      return;
    }

    if (emptyFieldMessage) setEmptyFieldMessage(null);

    const newTask = {
      id: nanoid(),
      done: false,
      tag: textareaData.tag,
      text: textareaData.textareaText,
      subTasks: textareaData.subTextareas.map((task) => ({
        text: task.subTextareaText,
        id: task.id,
        tag: task.tag,
        done: false,
      })),
      creationDate: Date.now(),
    };

    console.log(newTask);
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
              />
              <StyledConfirmBox>
                <Confirm
                  showDecline={false}
                  justifyContent="flex-left"
                  onAccept={addTaskHandler}
                />
                {emptyFieldMessage && (
                  <div>
                    <span>{emptyFieldMessage}</span>
                  </div>
                )}
              </StyledConfirmBox>
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
