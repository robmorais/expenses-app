import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
// import "../App.css";

const Navibar = (props) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/">Expensy</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
          <LinkContainer to="signup">
            <Nav.Link>Sign up</Nav.Link>
          </LinkContainer>
          <LinkContainer to="login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        </Nav>        
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navibar;