import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserCircle, faSearchPlus, faStore } from '@fortawesome/free-solid-svg-icons'

class myNav extends Component {
  render() {
    let authLink = (
      <Nav>
        <NavLink style={{ color: 'white' }} to={this.props.user ? '/profile' : '/'} className="nav-link"><FontAwesomeIcon icon={faHome} size="2x"/></NavLink>
      </Nav>
    );
  
    if (this.props.user) {
        authLink = (
          <Nav>
            <NavLink style={{ color: 'white' }} to={this.props.user ? '/profile' : '/'} className="nav-link"><FontAwesomeIcon icon={faHome} size="2x"/></NavLink>
            <NavLink style={{color: "white", paddingLeft: "50px"}} to="/create" className="nav-link"><FontAwesomeIcon icon={faSearchPlus} size="2x"/></NavLink>
            <NavLink style={{color: "white", paddingLeft: "50px"}} to="/my-shops" className="nav-link"><FontAwesomeIcon icon={faStore} size="2x"/></NavLink>
            <NavLink style={{color: "white", paddingLeft: "50px"}} to="/edit/profile" className="nav-link"><FontAwesomeIcon icon={faUserCircle} size="2x"/></NavLink>
          </Nav>
        );
    }

    return (
        <Navbar className="navbar" fixed="bottom">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
              {authLink}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default myNav;
