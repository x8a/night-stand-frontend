import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: this.props.loggedInUser.username, 
            name: this.props.loggedInUser.name,
            lastName: this.props.loggedInUser.lastName,
            pic: this.props.loggedInUser.pic,
            file: {}
        };
        this.service = new AuthService();
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handlePicChange = (event) => {
        this.setState({
          ...this.state,
          file: event.target.files[0],
        });
    };

    handleImageUpload = (event) => {
        event.preventDefault();
        const uploadData = new FormData();
        uploadData.append('pic', this.state.file);
    
        this.service
          .upload(uploadData)
          .then()
          .catch((err) => console.log(err));
    };

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
            <div className="general-bg" style={{height: "100%", color: "#393b44", paddingTop: "80px"}}>
            <div className="profile pt-3">
                <img className="profile-pic" src={this.state.pic} alt="Profile pic"/>
            </div>
            <form onSubmit={this.handleFormSubmit} className="forms" >
            <div className="form-group">
                <div className="custom-file">
                <input className="custom-file-input" type="file" name="pic" onChange={this.handlePicChange} />
                <label className="custom-file-label text-left">{this.state.file.name}</label>
                </div>
            </div>

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
            
            <div className="d-flex mt-3">
            <button style={{height: "48px", fontSize: "18px"}} className="btn btn-secondary w-50 mr-2" onClick={this.handleImageUpload}>Update picture</button>
            <button style={{height: "48px", fontSize: "20px"}} className="btn btn-info w-50" type="submit">Save</button>
            </div>
          </form>  

          <p className="edit-profile"><Link style={{height: "48px", fontSize: "20px"}} to="/logout" className="btn btn-danger">Log out</Link></p>
        </div>
        )
    }
}
