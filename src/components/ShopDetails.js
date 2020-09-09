import React, { Component } from 'react'
import axios from "axios";
import GoogleMapReact from 'google-map-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export default class ShopDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getStore = () => {
        const { params } = this.props.match;
        axios
          .get(`${process.env.REACT_APP_API_URL}/my-shops/${params.id}`)
          .then((response) => {
            this.setState(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
    };

    getLocation = () => {
      axios.get(process.env.REACT_APP_API_URL + '/map?search=' + this.state.address)
        .then(response => {
            this.setState({
                ...this.state,
                lat: response.data.candidates[0].geometry.location.lat,
                lng: response.data.candidates[0].geometry.location.lng
            })
        })
        .catch(e => console.log(e))
    }

    getMapOptions = (maps) => {
      return {
        disableDefaultUI: false,
        mapTypeControl: false,
        streetViewControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }],
          },
        ],
      };
    };

    componentDidMount() {
        this.getStore();
    }

    render() {
        const MyMarker = () => <FontAwesomeIcon style={{color: '#3b6978'}} icon={faMapMarkerAlt} size='3x'/>;

        return (
            <div className="general-bg pl-3" style={{ minHeight: "100%", color: "#393b44", paddingTop: "90px" }}>
            <div>
                <h1 className='text-center'>{this.state.store}</h1>
                <p  className='text-center'>{this.state.address}</p>
            </div>
            {!this.state.lat? <button onClick={this.getLocation} className="btn btn-info" style={{height: "48px", fontSize: "20px", marginLeft: '30%'}}>Show in map</button> : ''}
            {this.state.lat ? 
              <div className="pt-3" style={{ width: "350px", height: "530px" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_KEY,
                  }}
                  center={{
                    lat: this.state.lat,
                    lng: this.state.lng
                  }}
                  defaultZoom={15}
                  options={this.getMapOptions}
                  yesIWantToUseGoogleMapApiInternals
                >
                <MyMarker
                  lat={this.state.lat}
                  lng={this.state.lng}
                />
                </GoogleMapReact>
              </div>            
            :
              ''
            }
            <div className="empty"></div>
            </div>
        )
    }
}
