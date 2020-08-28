import React, { Component } from 'react'
import axios from 'axios';

export default class Profile extends Component {
    constructor(){
        super();
        this.state = { books: [] };
    }

    getUserBooks = () =>{
        axios.get(`${process.env.REACT_APP_API_URL}/profile`)
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
        console.log(this.props)
        console.log(this.state.books)

        let booksReading = ""

        if (this.props.loggedInUser.books.length !== 0) {
            booksReading = (
                <div className="profile">
                <h3>Reading</h3>
                <p>My book</p>
                </div>
            );
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
