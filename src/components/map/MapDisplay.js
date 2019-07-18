import React from 'react';
import { Map, Marker, TileLayer, Popup }  from 'react-leaflet';

class MapDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: this.props.lat,
      lon: this.props.lon,
      zoom: 13
    }
  }

  componentDidUpdate() {
    // if the user has updated their location
    if ((this.props.lat !== this.state.lat) ||
    // set state to reflect the new coordinates
     (this.props.lon !== this.state.lon)) {
       this.setState({ lat: this.props.lat, 
                      lon: this.props.lon })
     }
  }

  // update current position based on click. This invokes a 
  // callback method to update state in the App class
  updateCoords = (e) => {
    this.props.updateCoords(e.latlng.lat, e.latlng.lng);
  };

  // update zoom state when map view changed
  zoomChangeHanlder = (e) => {
    this.setState({ zoom: e.target._zoom});
  }

  // auto open the pop-up
  openPopUp = (e) => {
    e.target.openPopup()
  }
 
  render() {
    const position = [this.state.lat, this.state.lon];
    return (
      <Map center={position} onClick={(e) => this.updateCoords(e)} 
          onZoomend={(e) => this.zoomChangeHanlder(e)} zoom={this.state.zoom}>
        <TileLayer
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position} onMove={(e) => this.openPopUp(e)}
                onAdd={(e) => this.openPopUp(e)}>
          <Popup>
              Starting position: <br/>
              {this.state.lat.toFixed(3)}, {this.state.lon.toFixed(3)}
          </Popup>
        </Marker>
      </Map>
    );
  }
};

export default MapDisplay;