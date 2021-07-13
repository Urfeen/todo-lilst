import "./TasksList.scss";
import ListItem from "./ListItem.jsx";

const TasksList = ({ tasks, changeTaskStatusHandler, deleteTaskHandler }) => {
  return (
    <>
      {tasks.length === 0 ? (
        <span>no one task</span>
      ) : (
        <ul className="tasks-list">
          {tasks.map((task, index) => (
            <ListItem
              key={task.id}
              id={task.id}
              done={task.done}
              index={index}
              creationDate={task.creationDate}
              taskText={task.taskText}
              changeTaskStatusHandler={changeTaskStatusHandler}
              deleteTaskHandler={deleteTaskHandler}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TasksList;