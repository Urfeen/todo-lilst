import React from "react";
import TodoList from "./components/TodoList/TodoList.jsx";
import "./App.css";
import "./reset-styles.css";
import ReactLogo from "./img/react-logo.png";
import Particles from "react-particles-js";
import AuthProvider from "./contexts/AuthContext.jsx";
import RtDBProvider from "./contexts/RtDBProvider.jsx";

function App() {
  return (
    <>
      <Particles params={{
        "particles": {
          "number": {
            "value": 35,
          },
          "color": {
            "value": "#ddd"
          },
          "line_linked": {
            "distance": 80,
            "color": "#ddd",
            "opacity": 0.2,
          },
          "move": {
            "speed": 1
          }
        }
      }}
      />
      <div className="wrapper">
        <main>
          <AuthProvider>
            <RtDBProvider>
              <TodoList />
            </RtDBProvider>
          </AuthProvider>
        </main>
        <footer>
          <img src={ReactLogo} alt="react-logo" />
        </footer>
      </div>
    </>
  );
};

export default App;
