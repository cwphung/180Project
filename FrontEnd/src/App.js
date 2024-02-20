import React, { useState } from "react";
import './Components/LoginSignup/LoginSignup.css';
import Login from "./Components/LoginSignup/Login";
import Register from "./Components/LoginSignup/Register";
import Home from "./Components/HomePage/Home";

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); 
  };

  // Determine the class for the App based on the login state
  const appClass = isLoggedIn ? "App homeBackground" : "App";

  return (
    <div className={appClass}>
      {
        isLoggedIn ? <Home /> :
        currentForm === "login" ? <Login onFormSwitch={toggleForm} onLoginSuccess={handleLoginSuccess} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
}


export default App;
