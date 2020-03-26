import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Routes from "./Routes";
import Navbar from './components/Navbar'
// import Login from './components/Login'

function App() {
  return (
    // <div className="App">
    <Router>
      <Navbar fluid/>
      <div className="App container">
        <Routes />
        {/* <Login /> */}
      </div>
    </Router>
  );
}

export default App;
