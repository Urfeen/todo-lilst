import React, { memo, useEffect, useRef, useState } from "react";
import TasksList from "../TasksList/TasksList.jsx";
import Modal from "../Modal/Modal.jsx";
import TextareaWithSubTextarea from "../TextareaWithSubTextarea/TextareaWithSubTextarea.jsx";
import { nanoid } from "nanoid";
import styled from "styled-components";
import AddButton from "../AddButton/AddButton.jsx";
import Confirm from "../Confirm/Confirm.jsx";
import StyledTodoList from "./StyledTodoList.style.js";
import SignUp from "../SignUp/SignUp.jsx";

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



function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [textareaData, setTextareaData] = useState();
  const [emptyFieldMessage, setEmptyFieldMessage] = useState(null);
  const [modalContent, setModalContent] = useState("");

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
      startDate: Date.now(),
      endDate: null,
    };

    setTasks((prevState) => {
      const arrCopy = [...prevState];
      arrCopy.unshift(newTask);
      return arrCopy;
    });
    setModalClosing(true);
  };
  const changeTaskStatusHandler = (taskId, subtaskId, taskIndex) => {
    setTasks((prevState) => {
      let updatedList = null;

      if (subtaskId) {
        updatedList = prevState.map((task) => {
          if (task.id === taskId) {
            const updatedSubtasks = task.subtasks.map((subtask) => {
              if (subtask.id === subtaskId) {
                return {
                  ...subtask,
                  done: !subtask.done,
                };
              }
              return subtask;
            })

            const isAllDone = !updatedSubtasks.find((subtask) => subtask.done === false);
            return {
              ...task,
              done: isAllDone,
              endDate: isAllDone ? Date.now() : null,
              subtasks: updatedSubtasks,
            };
          }
          return task;
        });
        updatedList[taskIndex].subtasks.sort((a, b) => a.done - b.done);
      } else {
        updatedList = prevState.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              done: !task.done,
              endDate: !task.done ? Date.now() : null,
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
      return updatedList.sort((a, b) => a.done - b.done);
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
        <button
          className="signIn-btn"
          type="button"
          onClick={() => {
            setModalContent("Sign up");
            toggleModalHandler();
          }}
        >
          <span>Sign up</span>
        </button>
        <AddButton
          className="add-todo-btn"
          size="2rem"
          onClick={() => {
            setModalContent("Create new task");
            toggleModalHandler();
          }}
        />
        {isModalOpen && (
          <Modal
            title={modalContent}
            zIndexBox={2}
            onClose={toggleModalHandler}
            modalClosing={modalClosing}
            setModalClosing={setModalClosing}
            onUnmount={() => setEmptyFieldMessage(null)}
          >
            {modalContent === "Create new task" ? (
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
            ) : modalContent === "Sign up" ? (
              <SignUp />
            ) : null}
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
