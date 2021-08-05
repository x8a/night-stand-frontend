import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current
  );
  autoComplete.setFields(["name", "address_components", "formatted_address", "geometry"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

let name = ''
let lat = 0;
let long = 0;

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const address = addressObject.formatted_address;
  name = addressObject.name;
  lat = addressObject.geometry.location.lat();
  long = addressObject.geometry.location.lng();
  updateQuery(address);
}

const saveShop = (name, lat, long, query) => {
  const body = {
    store: name,
    address: query,
    lat: lat,
    long: long
  };
  axios
  .post(`${process.env.REACT_APP_API_URL}/new-shop`, body, {withCredentials:true})
  .then()
  .catch(e => console.log(e));
};


function AddShop() {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className="search-location-input general-bg pl-3" style={{ minHeight: "100%", color: "#393b44", paddingTop: "90px" }}>
      <form className="forms">
            <div className="form-group">
            <input className="form-control" type="text"  placeholder="Search for a bookstore" ref={autoCompleteRef} onChange={event => setQuery(event.target.value)} value={query}/>
            </div>
      
            <div className="form-group">
            <label>Name</label>
            <input className="form-control" type="text" name="name" onChange={() => null} value={name}/>
            </div>

            <div className="form-group">
            <label>Address</label>
            <input className="form-control" type="text" name="address" onChange={() => null} value={query}/>
            </div>
            <button onClick={() => saveShop(name, lat, long, query)} style={{height: "48px", fontSize: "20px"}} className="btn btn-info" type="submit" >Add book store</button>

            <div className="form-group">
            <input className="form-control" type="text" name="lat" onChange={() => null} value={lat}/>
            </div>

            <div className="form-group">
            <input className="form-control" type="text" name="long" onChange={() => null} value={long}/>
            </div>
      </form>
    </div>
  );
}

export default AddShop;
