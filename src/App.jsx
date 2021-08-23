import React from "react";
import TodoList from "./components/TodoList.jsx";
import "./App.css";
import "./reset-styles.css";
import "./common-styles.scss";
import ReactLogo from "./img/react-logo.png";

const App = () => {
  return (
    <div className="wrapper">
      <main>
        <TodoList />
      </main>
      <footer>
        <img src={ReactLogo} alt="react-logo" />
      </footer>
    </div>
  );
};

export default App;
