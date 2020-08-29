import React, { Component } from 'react';
import axios from "axios";
 
class NewBook extends Component {
  constructor(props){
    super(props);
    this.state = { 
      title: '', 
      author: '',
      description: '',
      status: 'pending'
    };
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
 
  handleFormSubmit = (event) => {
    event.preventDefault();
    const body = {
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      status: this.state.status,
      reader: this.props.loggedInUser._id
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/create/pending`, body, {withCredentials:true})
      .then(() => {
        this.props.history.push('/profile')
      })
      .catch((error) => console.log(error));
  };
 
  render(){
    return(
        <div>
          <form onSubmit={this.handleFormSubmit} className="forms" >
            <div className="form-group">
            <label>Title</label>
            <input className="form-control" type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
            </div>

            <div className="form-group">
            <label>Author</label>
            <input className="form-control" type="text" name="author" value={this.state.author} onChange={ e => this.handleChange(e)} />
            </div>

            <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
            </div>

            <div className="form-group">
            <label>Status</label>
            <select className="form-control" value={this.state.status} name="status" onChange={ e => this.handleChange(e)}>
                <option value="pending">Pending</option>
                <option value="reading">In progress</option>
                <option value="finished">Finished</option>
            </select>
            </div>
            
            <input className="btn btn-primary" type="submit" value="Add book" />
          </form>
     
        </div>
      )
  }
}
 
export default NewBook;