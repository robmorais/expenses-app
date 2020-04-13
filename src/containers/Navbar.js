import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Session from '../utils/Session';
import API from '../utils/API';
// import "../App.css";

const Navibar = ({appProps, history}) => {
  const { isAuthenticated, userHasAuthenticated } = appProps;
  function handleLogout() {
    userHasAuthenticated(false);
    Session.cleanSession();
    history.push("/login");
    API.defaults.withCredentials = true;
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/">Expensy</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
          { isAuthenticated 
            ? <> 
                <LinkContainer to="/summary">
                  <Nav.Link>Summary</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            : <>
                <LinkContainer to="/signup">
                  <Nav.Link>Sign up</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
          }
        </Nav>        
      </Navbar.Collapse>
    </Navbar>
  );
}

export default withRouter(Navibar);