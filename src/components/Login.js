import React, { Component } from 'react';
import AuthService from '../auth/auth-service';
import { Link } from 'react-router-dom';
 
class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }
 
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
    .then( response => {
        this.setState({ username: "", password: "" });
        this.props.getUser(response)
        this.props.history.push('/profile')
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    return (
      <div className="general-bg" style={{height: "100%", color: "#393b44", paddingTop: "90px"}}>
        <form onSubmit={this.handleFormSubmit} className="forms">
          <div className="form-group">
            <label>Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={this.state.username}
              onChange={(e) => this.handleChange(e)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={this.state.password}
              onChange={(e) => this.handleChange(e)}
            />
          </div>

          <input style={{height: "48px", fontSize: "20px"}} className="btn btn-secondary" type="submit" value="Login" />
        </form>
        <p className="form-text">
          Don't have an account? <Link style={{color: "#3b6978"}} to={'/signup'}>Signup</Link>
        </p>
      </div>
    );
  }
}
 
export default Login;