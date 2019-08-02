import React from "react";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import toDate from 'normalize-date'

class MapTweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locateTweet: [],
      center: {
        lat: 38.290,
        lng: 138.988,
        zoom: 5
      }
    };
  }

  componentWillMount() {
    fetch('https://compasspandaapi.firebaseapp.com/map', {
      headers: {
        'Content-Type' : 'application/json',
        Accept: "application/json"
      }
    })
    .then(response => response.text())
    .then(responseText => JSON.parse(responseText))
    .then((responseJson) => {
      const tmp = [];
      for (const [t, d] of Object.entries(responseJson)) {
        if (Object.keys(d).length === 3) {
          d.timestamp = t;
          tmp.push(d);
        }
      }
      this.setState({ locateTweet: tmp });
    })
    .catch((err) => {
      alert(err);
    });
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          zoom: 9
        }
      })
    }, (err) => {
      alert(err.message);
    }, {
      enableHighAccuracy: false, 
      timeout: 1000, 
      maximumAge: 1000
  });
  }

  render() {
    const locateTweet = this.state.locateTweet;
    const centerPosition = [this.state.center.lat, this.state.center.lng];
    return (
    <Map center={centerPosition} zoom={this.state.center.zoom}>
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locateTweet.map(l => (
        <Marker position={[l.latitude, l.longitude]} key={l.timestamp}>
            <Popup>
                {l.tweet}{'\n'}
                {JSON.stringify(toDate(l.timestamp), {noTime: true})}
            </Popup>
        </Marker>
      ))}
      </Map>
    );
  }
}

export default MapTweet;