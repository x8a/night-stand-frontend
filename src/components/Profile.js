import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default class Profile extends Component {
    constructor(){
        super();
        this.state = { books: [] };
    }

    getUserBooks = () =>{
        axios.get(`${process.env.REACT_APP_API_URL}/books`, {withCredentials: true})
        .then(response => {
          this.setState({
            books: response.data
          })
        })
    }

    componentDidMount() {
        this.getUserBooks();
    }

    render() {
        let bookList = ""

        if (this.props.loggedInUser.books.length !== 0) {
          const myBooks = this.state.books.map((book) => {
            return (
              <div key={book._id} className="mt-3">
                <Link style={{ color: "white" }} to={`/book/${book._id}`}>
                <Card className="card" style={{ width: "18rem", backgroundColor: "#30e3ca"}}>                  
                <Card.Body>
                <img src={book.pic} style={{ width: "40%", float: "right"}} alt="Book cover"/>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                    <Card.Text>
                    {book.status}
                    </Card.Text>
                  </Card.Body>                  
                </Card>
                </Link>
              </div>
            );
          });

          bookList = (
            <div className="profile">
              {myBooks}
            </div>
          );
        }

        return (
            <div className="general-bg pt-3">
                <div className="forms">
                    <Link to="/create/pending" className="btn btn-info">Add book</Link>
                </div>
                {bookList}
                <div className="empty"></div>
            </div>
        )
    }
}
