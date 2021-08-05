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
      console.log(this.state)
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

                <h1 className='text-center'>{this.state.store}</h1>
                <p  className='text-center'>{this.state.address}</p>

            <div className="pt-3" style={{ width: "350px", height: "530px" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOOGLE_KEY,
                }}
                center={{
                  lat: this.state.lat,
                  lng: this.state.long
                }}
                defaultZoom={15}
                options={this.getMapOptions}
                yesIWantToUseGoogleMapApiInternals
              >
              <MyMarker
                lat={this.state.lat}
                lng={this.state.long}
              />
              </GoogleMapReact>
            </div>            
            <div className="empty"></div>
            </div>
        )
    }
}
