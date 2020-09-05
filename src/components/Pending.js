import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import SegmentedControl from "./SegmentedControl";

export default class Pending extends Component {
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
        let booksPending = ""

        if (this.props.loggedInUser.books.length !== 0) {
            const pending = this.state.books.filter(el => {return el.status === 'Pending'})
            if(pending.length > 0) {
                const reading = pending.map(book => {return (
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

                booksPending = (
                    <div className="profile">
                    {reading}
                    </div>
                )
            }
        }

        return (
            <div className="general-bg" style={{minHeight: "100%", paddingTop: "90px"}}>
                <SegmentedControl />
                {booksPending}
                <div className="empty"></div>
            </div>
        )
    }
}
