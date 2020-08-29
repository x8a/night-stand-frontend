import React, { Component } from 'react'
import { NavLink } from "react-router-dom";


export default class Home extends Component {
    render() {
        return (
            <div className="general-bg landing">           
                <div className="intro">
                    <h1>Nightstand</h1>
                    <p>Keep track of your books, whether you want to read them, you're already on it, or you finished the adventure!</p>
                </div>
                <div className="home-links">
                    <button className="btn btn-info"><NavLink to="/signup" className="btn btn-info">Sign up</NavLink></button>
                    <button className="btn btn-secondary"><NavLink to="/login" className="btn btn-secondary">Log in</NavLink></button>
                </div>
            </div>
        )
    }
}
