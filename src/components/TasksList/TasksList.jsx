import "./TasksList.scss";
import ListItem from "./ListItem.jsx";
import React from "react";

const TasksList = ({ tasks, changeTaskStatusHandler, deleteTaskHandler }) => {
  return (
    <ul className="tasks-list">
      {tasks.map((task, index) => (
        <ListItem
          key={task.id}
          id={task.id}
          done={task.done}
          index={index}
          creationDate={task.creationDate}
          taskText={task.subTextareaText}
          subtasks={task.subTextareas}
          changeTaskStatusHandler={changeTaskStatusHandler}
          deleteTaskHandler={deleteTaskHandler}
        />
      ))}
    </ul>
  );
};

export default TasksList;
