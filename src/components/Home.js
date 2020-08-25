import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="intro">
                    <h1>Nightstand</h1>
                    <p>Keep track of your books, whether you want to read them, you're already on it, or you finished the adventure!</p>
                </div>
                <ul >
                    <li className="links"><NavLink to="/signup" className="btn btn-primary">Sign up</NavLink></li>
                    <li className="links"><NavLink to="/login" className="btn btn-success">Log in</NavLink></li>
                </ul>
            </div>
        )
    }
}
