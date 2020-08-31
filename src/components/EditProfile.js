import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: this.props.loggedInUser.username, 
            name: this.props.loggedInUser.name,
            lastName: this.props.loggedInUser.lastName,
            pic: this.props.loggedInUser.pic
        };
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
      }

    handleFormSubmit = (event) => {
        const body = {
            username: this.state.username,
            name: this.state.name,
            lastName: this.state.lastName,
        };

        event.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}${this.props.location.pathname}`, body, {withCredentials:true})
        .then( () => {
            this.props.history.push('/profile');    
        })
        .catch( error => console.log(error) )

    }
    

    render() {
        return (
            <div className="general-bg" style={{height: "100%"}}>
            <div className="profile pt-3">
                <img className="profile-pic" src={this.state.pic} alt="Profile pic"/>
            </div>
            <form onSubmit={this.handleFormSubmit} className="forms" >
            <div className="form-group">
            <label>Username</label>
            <input className="form-control" type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
            </div>

            <div className="form-group">
            <label>Name</label>
            <input className="form-control" type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)} />
            </div>

            <div className="form-group">
            <label>Last Name</label>
            <input className="form-control" type="text" name="lastName" value={this.state.lastName} onChange={ e => this.handleChange(e)} />
            </div>
            
            <input className="btn btn-info" type="submit" value="Save changes" />
          </form>  

          <p className="edit-profile"><Link to="/logout" className="btn btn-danger">Log out</Link></p>
        </div>
        )
    }
}
