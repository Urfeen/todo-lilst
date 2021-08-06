import ListItem from "./ListItem.jsx";
import React from "react";

const TasksList = ({ tasks, changeTaskStatusHandler, deleteTaskHandler }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <ListItem
          key={task.id}
          id={task.id}
          done={task.done}
          index={index}
          creationDate={task.creationDate}
          taskText={task.text}
          subtasks={task.subtasks}
          changeTaskStatusHandler={changeTaskStatusHandler}
          deleteTaskHandler={deleteTaskHandler}
        />
      ))}
    </ul>
  );
};

export default TasksList;
