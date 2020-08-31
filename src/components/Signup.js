import React, { Component } from 'react';
import AuthService from '../auth/auth-service';
import { Link } from 'react-router-dom';
 
class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { 
      username: '', 
      password: '',
      name: '',
      lastName: ''
    };
    this.service = new AuthService();
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
 
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const name = this.state.name;
    const lastName = this.state.lastName;
   
    this.service.signup(username, password, name, lastName)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
            name: "",
            lastName: ""
        });
        this.props.getUser(response)
        this.props.history.push('/profile')
    })
    .catch( error => console.log(error) )
  }
 
  render(){
    return(
        <div className="general-bg" style={{height: "100%"}}>
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

            <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
            </div>
            
            <input className="btn btn-info" type="submit" value="Signup" />
          </form>
     
          <p className="form-text">Already have an account? <Link to={"/login"}>Log in</Link></p>
     
        </div>
      )
  }
}
 
export default Signup;