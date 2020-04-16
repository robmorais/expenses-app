import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Routes from "./Routes";
import Navbar from './containers/Navbar'
import Session from './utils/Session';
// import Login from './components/Login'

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState();

  useEffect(() => {
    onLoad();
  }, []);
  
  function onLoad() {
    userHasAuthenticated(Session.startSession());
    //console.log("app");
    //console.log(isAuthenticated);
    // TODO - add headers to axios
    // TODO - redirect to login / main page
  }
    
  return (
    // <div className="App">
    <Router>
      <Navbar fluid appProps={{ isAuthenticated, userHasAuthenticated }} />
      <div className="App container">
        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
      </div>
    </Router>
  );
}

export default App;
