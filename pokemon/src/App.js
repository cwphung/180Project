import React, { useState } from "react";
import './Components/LoginSignup/LoginSignup.css';
import { Login } from "./Components/LoginSignup/Login";
import { Register } from "./Components/LoginSignup/Register";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;