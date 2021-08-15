import React, { memo, useEffect, useState } from "react";
import TasksList from "./TasksList/TasksList.jsx";
import Modal from "./Modal/Modal.jsx";
import TextareaWithSubTextarea from "./TextareaWithSubTextarea/TextareaWithSubTextarea.jsx";
import { nanoid } from "nanoid";
import styled from "styled-components";
import AddButton from "./AddButton/AddButton.jsx";
import Confirm from "./Confirm/Confirm.jsx";
import StyledTodoList from "./StyledTodoList.style.js";

const StyledConfirmBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 0px 1px 0px;
  div:nth-child(2) {
    margin: 0px 0px 0px 0.6rem;
    span {
      font-size: 1rem;
      color: #fffb17cf;
    }
  }
`;

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [textareaData, setTextareaData] = useState();
  const [emptyFieldMessage, setEmptyFieldMessage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);

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
      text: textareaData.textareaText.trim(),
      subtasks: textareaData.subTextareas.map((task) => ({
        text: task.subTextareaText.trim(),
        id: task.id,
        done: false,
      })),
      creationDate: Date.now(),
    };

    setTasks((prevState) => {
      const arrCopy = [...prevState];
      arrCopy.unshift(newTask);
      return arrCopy;
    });
    setModalClosing(true);
  };
  const changeTaskStatusHandler = (taskId, subtaskId) => {
    setTasks((prevState) => {
      let updatedList = null;

      if (subtaskId) {
        updatedList = prevState.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              subtasks: task.subtasks.map((subtask) => {
                if (subtask.id === subtaskId) {
                  return {
                    ...subtask,
                    done: !subtask.done,
                  };
                }
                return subtask;
              }),
            };
          }
          return task;
        });
      } else {
        updatedList = prevState.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              done: !task.done,
              subtasks: task.subtasks.map((subtask) => {
                return {
                  ...subtask,
                  done: !task.done,
                };
              }),
            };
          }
          return task;
        });
      }
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
    <StyledTodoList>
      <header>
        <h1>Todo list</h1>
        <AddButton
          className="add-todo-btn"
          size="2rem"
          onClick={toggleModalHandler}
        />
        {isModalOpen && (
          <Modal
            title="Create new task"
            zIndexBox={2}
            onClose={toggleModalHandler}
            modalClosing={modalClosing}
            setModalClosing={setModalClosing}
            onUnmount={() => setEmptyFieldMessage(null)}
          >
            <form onSubmit={addTaskHandler}>
              <TextareaWithSubTextarea
                subPlaceholder="Type something here..."
                showLines={true}
                onChangeGetData={setTextareaData}
              />
              <StyledConfirmBox>
                <Confirm
                  justifyContent="flex-left"
                  onDecline={(e) => {
                    e.preventDefault();
                    setModalClosing(true);
                  }}
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
      <div className="todos">
        {tasks.length !== 0 ? (
          <TasksList
            tasks={tasks}
            changeTaskStatusHandler={changeTaskStatusHandler}
            deleteTaskHandler={deleteTaskHandler}
          />
        ) : (
          <span>no one todo</span>
        )}
      </div>
    </StyledTodoList>
  );
};

export default memo(TodoList);
