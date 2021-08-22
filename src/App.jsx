import React from "react";
import TodoList from "./components/TodoList.jsx";
import "./App.css";
import "./reset-styles.css";
import "./common-styles.scss";

const App = () => {
  return (
    <div className="wrapper">
      <main>
        <TodoList />
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
