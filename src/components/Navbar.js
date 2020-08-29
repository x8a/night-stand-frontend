import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

class myNav extends Component {
  render() {
    let authLink = (
        <Nav className="mr-auto">
        <NavLink to="/signup" className="nav-link">Sign up</NavLink>
        <NavLink to="/login" className="nav-link">Log in</NavLink>
        </Nav>
      );
  
    if (this.props.user) {
        authLink = (
          <Nav className="mr-auto">
            <NavLink to="/create/pending" className="nav-link">Add book</NavLink>
            <NavLink to="/logout" className="nav-link">Log out</NavLink>
          </Nav>
        );
    }
  


    return (
        <Navbar className="navbar" expand="lg">
        <Navbar.Brand><NavLink to={this.props.user ? '/profile' : '/'}><FontAwesomeIcon icon={faHome}/></NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
              {authLink}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default myNav;
