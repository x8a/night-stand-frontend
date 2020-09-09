import React, { Component } from 'react'
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default class Shops extends Component {
    constructor(){
        super();
        this.state = { stores: [] };
    }

    getUserStores = () =>{
        axios.get(`${process.env.REACT_APP_API_URL}/my-shops`, {withCredentials: true})
        .then(response => {
          this.setState({
            stores: response.data
          })
        })
    }

    deleteStore = id => {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/my-shops/${id}`, {withCredentials:true})
          .then()
          .catch((err) => {
            console.log(err);
          });
        this.getUserStores()
    };

    componentDidMount() {
        this.getUserStores();
    }

    render() {
        let myStores = ""

        if (this.props.loggedInUser.stores.length !== 0) {
          const bookStores = this.state.stores.map(store => {
            return (
              <div key={store._id} className="mt-3">                
                <Card className="card" style={{ width: "18rem", backgroundColor: "#f1f3f8"}}>                  
                <Card.Body style={{color: "#393b44"}}>
                <NavLink style={{ color: "#393b44" }} to={`/my-shops/${store._id}`}>
                    <Card.Title>{store.store}</Card.Title>
                </NavLink>
                    <Card.Subtitle className="mb-2 text-muted">{store.address}<FontAwesomeIcon onClick={() => this.deleteStore(store._id)} style={{color: '#3b6978', marginLeft: '210px'}} size='2x' icon={faTrashAlt} /></Card.Subtitle>                    
                  </Card.Body>                  
                </Card>
              </div>
            );
          });

          myStores = (
            <div className="profile">
              {bookStores}
            </div>
          );
        }

        return (
            <div className="general-bg" style={{minHeight: "100%", color: "#393b44" , paddingTop: "90px"}}>
                <div className='add-shops pt-3'>
                <NavLink to="/new-shop"><FontAwesomeIcon style={{color: '#3b6978'}} size='4x' icon={faPlusCircle} /></NavLink>
                </div>
                {myStores}
            </div>
        )
    }
}
