import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
 
class NewBook extends Component {
  constructor(props){
    super(props);
    this.state = { 
      title: '', 
      author: '',
      description: '',
      status: 'Pending',
      search: '',
      searchResults: []
    };
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSearch = () => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.search}&key=${process.env.GOOGLE_KEY}`)
    .then(res => {
      this.setState({
        ...this.state,
        searchResults: res.data.items,
      });
    })
    .catch((error) => console.log(error));

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

    let results = ""

    if (this.state.searchResults.length !== 0) {
      console.log(this.state.searchResults)
      results = this.state.searchResults.map(book => {
        return (
          <option key={book.id}>{book.volumeInfo.title} {book.volumeInfo.authors? `- ${book.volumeInfo.authors[0]}` : ""}</option>
        )
      })
    }

    return (
      <div
        className="general-bg"
        style={{ height: "100%", color: "#393b44", paddingTop: "90px" }}
      >
        <form className="forms">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              name="search"
              placeholder="Search for a book"
              value={this.state.search}
              onChange={(e) => this.handleChange(e)}
            />
            <div className="input-group-append">
              <span onClick={(e) => this.handleSearch(e)} className="input-group-text">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </div>
          <div className="form-group">
              <select className="form-control">
                {results}
              </select>
          </div>
        </form>

        <form onSubmit={this.handleFormSubmit} className="forms">
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              value={this.state.title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              className="form-control"
              type="text"
              name="author"
              value={this.state.author}
              onChange={(e) => this.handleChange(e)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={this.state.description}
              onChange={(e) => this.handleChange(e)}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              className="form-control"
              value={this.state.status}
              name="status"
              onChange={(e) => this.handleChange(e)}
            >
              <option value="Pending">Pending</option>
              <option value="Reading">In progress</option>
              <option value="Finished">Finished</option>
            </select>
          </div>

          <input
            style={{ height: "48px", fontSize: "20px" }}
            className="btn btn-info"
            type="submit"
            value="Add book"
          />
        </form>
        <p className="edit-profile">
          <Link
            style={{ height: "48px", fontSize: "20px" }}
            to="/profile"
            className="btn btn-danger"
          >
            Cancel
          </Link>
        </p>
      </div>
    );
  }
}
 
export default NewBook;