import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Card } from 'react-bootstrap';
 
class NewBook extends Component {
  constructor(props){
    super(props);
    this.state = { 
      title: '', 
      author: '',
      description: '',
      pic: '',
      status: 'Pending',
      searchTitle: '',
      searchAuthor: '',
      searchResults: [],
      selectedBook: {}
    };
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSearchTitle = () => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTitle}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
    .then(res => {
      this.setState({
        ...this.state,
        searchResults: res.data.items,
      });
    })
    .catch((error) => console.log(error));

  }

  handleSearchAuthor = () => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${this.state.searchAuthor}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
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
      pic: this.state.pic ? this.state.pic : "",
      status: this.state.status,
      reader: this.props.loggedInUser._id
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/create`, body, {withCredentials:true})
      .then(() => {
        this.props.history.push('/profile')
      })
      .catch((error) => console.log(error));
  };

  selectBook = event => {
    const myBook = this.state.searchResults.find(book => book.id === event.currentTarget.id)
    this.setState({
      ...this.state,
      title: myBook.volumeInfo.title,
      author: myBook.volumeInfo.authors ? myBook.volumeInfo.authors[0] : "Unknown",
      pic: myBook.volumeInfo.imageLinks ? myBook.volumeInfo.imageLinks.thumbnail : "",
      description: myBook.volumeInfo.description ? myBook.volumeInfo.description : "",
      selectedBook: myBook
    });
  }
 
  render(){

    let resultsCards = ""

    if (this.state.searchResults.length !== 0) {
      resultsCards = this.state.searchResults.map(book => {
        return (
                <Card onClick={(e) => this.selectBook(e)} className="mt-3" key={book.id} id={book.id} style={{ backgroundColor: "#f1f3f8", margin: "0px 30px"}}>                  
                <Card.Body style={{color: "#393b44"}}>
                {book.volumeInfo.imageLinks ? <img src={book.volumeInfo.imageLinks.thumbnail} style={{ width: "40%", float: "right"}} alt="Book cover"/> : ""}
                    <Card.Title>{book.volumeInfo.title}</Card.Title>
                    {book.volumeInfo.authors? <Card.Subtitle className="mb-2 text-muted">{book.volumeInfo.authors[0]}</Card.Subtitle> : ""}
                  </Card.Body>                  
                </Card>
        )
      })
    }

    if(this.state.title) {
      resultsCards = 
        (       <div>
                <Card className="mt-3" key={this.state.selectedBook.volumeInfo.id} id={this.state.selectedBook.volumeInfo.id} style={{backgroundColor: "#f1f3f8", margin: "0px 30px"}}>                  
                <Card.Body style={{color: "#393b44"}}>
                {this.state.selectedBook.volumeInfo.imageLinks ? <img src={this.state.selectedBook.volumeInfo.imageLinks.thumbnail} style={{ width: "40%", float: "right"}} alt="Book cover"/> : ""}
                    <Card.Title>{this.state.selectedBook.volumeInfo.title}</Card.Title>
                    {this.state.selectedBook.volumeInfo.authors? <Card.Subtitle className="mb-2 text-muted">{this.state.selectedBook.volumeInfo.authors[0]}</Card.Subtitle> : ""}
                    {this.state.selectedBook.volumeInfo.description ? <Card.Text>{this.state.selectedBook.volumeInfo.description}</Card.Text> : "" }
                  </Card.Body>                  
                </Card>
                <form onSubmit={this.handleFormSubmit} className="forms">
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
        )
    }

    return (
      <div
        className="general-bg"
        style={{ minHeight: "100%", color: "#393b44", paddingTop: "90px" }}
      >
        <form className="forms">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              name="searchTitle"
              placeholder="Search by title"
              value={this.state.search}
              onChange={(e) => this.handleChange(e)}
            />
            <div className="input-group-append">
              <span onClick={(e) => this.handleSearchTitle(e)} className="input-group-text">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </div>

          <div className="input-group">
            <input
              className="form-control"
              type="text"
              name="searchAuthor"
              placeholder="Search by author"
              value={this.state.search}
              onChange={(e) => this.handleChange(e)}
            />
            <div className="input-group-append">
              <span onClick={(e) => this.handleSearchAuthor(e)} className="input-group-text">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </div>
        </form>

        {resultsCards}
        <div className="empty"></div>
      </div>
    );
  }
}
 
export default NewBook;