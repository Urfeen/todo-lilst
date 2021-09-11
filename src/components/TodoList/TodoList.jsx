import React, { memo, useEffect, useState } from "react";
import TasksList from "../TasksList/TasksList.jsx";
import Modal from "../Modal/Modal.jsx";
import TextareaWithSubTextarea from "../TextareaWithSubTextarea/TextareaWithSubTextarea.jsx";
import { nanoid } from "nanoid";
import styled from "styled-components";
import AddButton from "../AddButton/AddButton.jsx";
import Confirm from "../Confirm/Confirm.jsx";
import StyledTodoList from "./StyledTodoList.style.js";
import SignUpLogIn from "../SignUpLogIn/SignUpLogIn.jsx";
import LogInOutButton from "../LogInOutButton/LogInOutButton.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useRtDB } from "../../contexts/RtDBProvider.jsx";
import Loader from "../Loader/Loader.jsx";

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

const StyledLogOutConfirmation = styled.div`
  padding: 0.5rem;
  text-align: center;
  &>div{
    margin: 0.5rem 0px 0px 0px;
    div{
      margin: 0.8rem 0px 0 0px;
    }
  }
  .title{
    font-size: 1.2rem;
  }
  .error{
    margin: 0.8rem 0px 0px 0px;
    font-size: 1rem;
    color: tomato;
  }
`;

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [textareaData, setTextareaData] = useState();
  const [emptyFieldMessage, setEmptyFieldMessage] = useState(null);
  const [modalContent, setModalContent] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);

  const [modalFormIsLogin, setModalFormIsLogin] = useState(true);

  const [logOutConfirmationError, setLogOutConfirmationError] = useState('');

  const { currentUser, userLoading, logOut } = useAuth();
  const [tasksLoading, setTasksLoading] = useState(true);
  const { setDataByUrl, getOnValue } = useRtDB();

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
  const addTaskHandler = (e) => {
    e.preventDefault();

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
  const logOutHandler = (e) => {
    e.preventDefault();

    logOut()
      .then(() => {
        setModalClosing(true);
      })
      .catch((error) => {
        if (error.code) {
          setLogOutConfirmationError(error.code.slice(5).split('-').join(" "));
        } else {
          setLogOutConfirmationError(error);
        }
      });
  }

  useEffect(() => {
    setTasksLoading(true);
    if (currentUser) {
      const unSubscriber = getOnValue(`users/${currentUser.uid}/tasks`, (tasks) => {
        setTasks(JSON.parse(tasks));
        setTasksLoading(false);
      });
      return unSubscriber;
    } else if (currentUser === null) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      if (tasks && tasks.length !== 0) setTasks(tasks);
      setTasksLoading(false);
    }
  }, [currentUser, getOnValue]);

  useEffect(() => {
    if (currentUser && !tasksLoading && (JSON.stringify(tasks) !== localStorage.getItem("tasks"))) {
      setDataByUrl(`users/${currentUser.uid}/tasks`, JSON.stringify(tasks));
    } else if (currentUser === null) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, currentUser, tasksLoading, setDataByUrl]);

  return (
    <StyledTodoList>
      <header>
        {currentUser && (
          <div className="userEmail">
            <span>{currentUser && currentUser.email}</span>
          </div>
        )}
        <div className="title">
          <h1>Todo list</h1>
          {userLoading ? <Loader size={28} className="header-loader" /> : (
            <LogInOutButton
              isLogOut={currentUser}
              size={20}
              onClick={() => {
                setModalContent(currentUser ? "LogOut" : "SignUpLogIn");
                toggleModalHandler();
              }}
            />
          )}
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
              title={modalContent === "SignUpLogIn" ? modalFormIsLogin ? "Log in" : "Sign up" : modalContent}
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
                    />
                    {emptyFieldMessage && (
                      <div>
                        <span>{emptyFieldMessage}</span>
                      </div>
                    )}
                  </StyledConfirmBox>
                </form>
              ) : modalContent === "SignUpLogIn" ? (
                <SignUpLogIn
                  setModalClosing={setModalClosing}
                  modalFormIsLogin={modalFormIsLogin}
                  setModalFormIsLogin={setModalFormIsLogin}
                />
              ) : modalContent === "LogOut" ? (
                <form onSubmit={logOutHandler}>
                  <StyledLogOutConfirmation>
                    <div>
                      <span className="title">Are you sure want to log out?</span>
                      <Confirm
                        acceptText="Log out"
                        declineText="Cancel"
                        onDecline={(e) => {
                          e.preventDefault();
                          setModalClosing(true);
                        }}
                      />
                      {logOutConfirmationError && (
                        <div className="error">
                          <span>
                            {logOutConfirmationError}
                          </span>
                        </div>
                      )}
                    </div>
                  </StyledLogOutConfirmation>
                </form>
              ) : null}
            </Modal>
          )}
        </div>
      </header>
      <div className="todos">
        {userLoading || tasksLoading ? <Loader size={28} /> : (
          tasks && (tasks.length !== 0) ? (
            <TasksList
              tasks={tasks}
              changeTaskStatusHandler={changeTaskStatusHandler}
              deleteTaskHandler={deleteTaskHandler}
            />
          ) : (
            <span>no one todo</span>
          )
        )}
      </div>
    </StyledTodoList>
  );
};

export default memo(TodoList);
