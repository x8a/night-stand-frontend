import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

export default class NavbarTop extends Component {
    render() {
        return (
        <Navbar className="navbar nav-top" fixed="top">
          <Navbar.Brand>
            <NavLink style={{color: "white"}} to="/profile" className="nav-link">Nightstand</NavLink> 
          </Navbar.Brand>
        </Navbar>
        )
    }
}
