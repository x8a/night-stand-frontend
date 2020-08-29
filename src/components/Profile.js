import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
    constructor(){
        super();
        this.state = { books: [] };
    }

    getUserBooks = () =>{
        axios.get(`${process.env.REACT_APP_API_URL}/profile`, {withCredentials: true})
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
        let booksReading = ""

        if (this.props.loggedInUser.books.length !== 0) {
            const pending = this.state.books.filter(el => {return el.status === 'pending'})
            if(pending.length > 0) {
                const reading = pending.map(book => {return (
                    <Link style={{ textDecoration: 'none' }} to={`/book/${book._id}`} key={book._id}>
                    <p>{book.title} by {book.author}</p>
                    </Link>
                    )}
                )

                booksReading = (
                    <div className="profile">
                    <h3>Reading</h3>
                    {reading}
                    </div>
                )
            }
        }

        return (
            <div className="general-bg">
                <div className="profile pt-3">
                    <img className="profile-pic" src={this.props.loggedInUser.pic} alt="Profile pic"/>
                    <p>{this.props.loggedInUser.name} {this.props.loggedInUser.lastName}</p>
                </div>
                {booksReading}
            </div>
        )
    }
}
