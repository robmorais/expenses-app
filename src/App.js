import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Routes from "./Routes";
import Navbar from './containers/Navbar'
// import Login from './components/Login'

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
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
