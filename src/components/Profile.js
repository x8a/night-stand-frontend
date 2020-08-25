import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

export default class Profile extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to your profile, {this.props.loggedInUser.username}</h1>
                <p>Name: {this.props.loggedInUser.name}</p>
                <p>Last Name: {this.props.loggedInUser.lastName}</p>
                <NavLink to="/logout" className="nav-link">Logout</NavLink>
            </div>
        )
    }
}
