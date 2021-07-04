import TasksList from "./TasksList/TasksList.jsx";
import "./TodoList.scss";

const TodoList = () => {
  return (
    <div className="todo-list">
      <h1>Todo list</h1>
      <TasksList />
    </div>
  );
}

export default TodoList;