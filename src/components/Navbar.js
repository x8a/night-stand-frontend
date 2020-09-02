import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons'

class myNav extends Component {
  render() {
    let authLink = ""
  
    if (this.props.user) {
        authLink = (
          <Nav >
            <NavLink style={{color: "white"}} to="/pending" className="nav-link">Pending</NavLink>
            <NavLink style={{color: "white"}} to="/reading" className="nav-link">Reading</NavLink>
            <NavLink style={{color: "white"}} to="/read" className="nav-link">Finished</NavLink>
            <NavLink to="/edit/profile" className="nav-link"><FontAwesomeIcon style={{ color: 'white' }} icon={faUserCircle} size="2x"/></NavLink>
          </Nav>
        );
    }
  


    return (
        <Navbar className="navbar" fixed="bottom">
        <Navbar.Brand><NavLink style={{ color: 'white' }} to={this.props.user ? '/profile' : '/'}><FontAwesomeIcon icon={faHome} size="2x"/></NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
              {authLink}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default myNav;
