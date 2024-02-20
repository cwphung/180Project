import React, { useState } from "react";
import './App.css';
import Login from "./Components/LoginSignup/Login";
import Register from "./Components/LoginSignup/Register";
import Home from "./Components/HomePage/Home";
import PVE from "./Components/GameModes/PVE"; 
import PVP from "./Components/GameModes/PVP"; 

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); 

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('home'); 
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  const renderPage = () => {
    if (!isLoggedIn) {
      return currentForm === "login" ? 
        <Login onFormSwitch={toggleForm} onLoginSuccess={handleLoginSuccess} /> : 
        <Register onFormSwitch={toggleForm} />;
    }
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={handlePageChange} />;
      case 'PVE':
        return <PVE />;
      case 'PVP':
        return <PVP />;
      case 'quit':
        setIsLoggedIn(false);
        setCurrentForm('login');
        setCurrentPage('home'); // It can be set to different default page
        break;
      default:
        return <Home onPageChange={handlePageChange} />;
    }
  };

  const backgroundClass = isLoggedIn ? (currentPage === 'home' ? 'homeBackground' : '') : 'loginBackground';

  return (
    <div className={`App ${backgroundClass}`}>
      {renderPage()}
    </div>
  );
}

export default App;

