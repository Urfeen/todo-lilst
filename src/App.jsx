import React from "react";
import TodoList from "./components/TodoList.jsx";
import "./App.css";
import "./reset-styles.css";
import ReactLogo from "./img/react-logo.png";
import Particles from "react-particles-js";
import particlesjsConfig from "./particlesjs-config.json"

const App = () => {
  return (
    <>
      <Particles />
      <div className="wrapper">
        <main>
          <TodoList />
        </main>
        <footer>
          <img src={ReactLogo} alt="react-logo" />
        </footer>
      </div>
    </>
  );
};

export default App;
