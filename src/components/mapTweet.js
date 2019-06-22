import React from "react";
import { db } from "../firebase";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

class MapTweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locateTweet: []
    };
  }

  componentWillMount() {
    db.collection("locateTweet")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
        this.setState({ locateTweet: data });
      });
  }

  center = {
    lat: 38.290,
    lng: 138.988,
    zoom: 6,
}

  render() {
    const { locateTweet } = this.state;
    const centerPosition = [this.center.lat, this.center.lng];
    
    return (
    <Map center={centerPosition} zoom={this.center.zoom}>
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