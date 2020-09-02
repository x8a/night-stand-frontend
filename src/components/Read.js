import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default class Read extends Component {
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
        let booksFinished = ""

        if (this.props.loggedInUser.books.length !== 0) {
            const finished = this.state.books.filter(el => {return el.status === 'Finished'})
            if(finished.length > 0) {
                const booksList = finished.map(book => {return (
                    <div key={book._id} className="mt-3">
                    <Link style={{ color: "#393b44" }} to={`/book/${book._id}`}>
                    <Card className="card" style={{ width: "18rem", backgroundColor: "#f1f3f8"}}>                  
                    <Card.Body style={{color: "#393b44"}}>
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
                    )}
                )

                booksFinished = (
                    <div className="profile">
                    <h3 style={{color: "#393b44"}}>Finished</h3>
                    {booksList}
                    </div>
                )
            }
        }

        return (
            <div className="general-bg" style={{height: "100%", paddingTop: "90px"}}>
                {booksFinished}
                <div className="empty"></div>
            </div>
        )
    }
}
