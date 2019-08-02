import React from "react";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

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

  componentDidMount() {
    fetch('https://compasspandaapi.firebaseapp.com/map', {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    .then(response => response)
    .then((responseJson) => {
      console.log(responseJson);
      const tmp = [];
      for (const [_, d] of Object.entries(responseJson)) {
        if (Object.keys(d).length === 3) {
          tmp.push(d);
        }
      }
      this.setState({ locateTweet: tmp });
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
        <Marker position={[l.latitude, l.longitude]}>
            <Popup>
                {l.tweet}
            </Popup>
        </Marker>
      ))}
      </Map>
    );
  }
}

export default MapTweet;