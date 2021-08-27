import React from "react";
import TodoList from "./components/TodoList.jsx";
import "./App.css";
import "./reset-styles.css";
import ReactLogo from "./img/react-logo.png";
import Particles from "react-particles-js";

const App = () => {
  return (
    <>
      <Particles params={{
        "particles": {
          "number": {
            "value": 35,
          },
          "color": {
            "value": "#dddddd45"
          },
        }
      }}
      />
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
