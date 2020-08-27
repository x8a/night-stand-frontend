import React, { Component } from 'react'

export default class Profile extends Component {
    render() {
        console.log(this.props.loggedInUser.books)

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
            <div>
                <div className="profile">
                    <img className="profile-pic" src={this.props.loggedInUser.pic} alt="Profile pic"/>
                    <p>{this.props.loggedInUser.name} {this.props.loggedInUser.lastName}</p>
                </div>
                {booksReading}
            </div>
        )
    }
}
