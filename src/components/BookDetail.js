import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

export default class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getBook = () => {
        const { params } = this.props.match;
        axios
          .get(`${process.env.REACT_APP_API_URL}/book/${params.id}`)
          .then((response) => {
            const book = response.data;
            this.setState(book);
          })
          .catch((err) => {
            console.log(err);
          });
    };

    componentDidMount() {
        this.getBook();
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleFormSubmit = (event) => {
        const body = {
            status: this.state.status,
            description: this.state.description,
        };

        event.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}${this.props.location.pathname}`, body, {withCredentials:true})
        .then( () => {
            this.props.history.push('/profile');    
        })
        .catch( error => console.log(error) )

    }

    render() {
        return (
            <div className="book-details" style={{minHeight: "100%", paddingTop: "70px"}}>
                <div className="book-details-intro">
                    <h1>{this.state.title}</h1>
                    <p>{this.state.author}</p>
                    <img className="book-cover" alt="Book cover" src={this.state.pic}></img>
                </div>
                <form onSubmit={this.handleFormSubmit} className="forms">
                    <div className="form-group">
                        <label>Status</label>
                        <select className="form-control" value={this.state.status} name="status" onChange={ e => this.handleChange(e)}>
                            <option value="Pending">Pending</option>
                            <option value="Reading">In progress</option>
                            <option value="Finished">Finished</option>
                        </select>
                    </div>
                    <div className="form-group">
                    <label>Description</label>
                    <textarea rows="3" className="form-control" name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
                    </div>
                    
                    <input style={{height: "48px", fontSize: "20px"}} className="btn btn-info" type="submit" value="Save changes" />
                    <p style={{textAlign: "right", paddingTop: "10px"}}><Link style={{height: "48px", fontSize: "20px"}} to="/profile" className="btn btn-danger">Go back</Link></p>
                    <div className="empty"></div>
                    </form>
            </div>
        )
    }
}
