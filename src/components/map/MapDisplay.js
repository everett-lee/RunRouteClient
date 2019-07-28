import React from 'react';
import { Map, Marker, TileLayer, Popup, Polyline }  from 'react-leaflet';

class MapDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: this.props.lat,
      lon: this.props.lon,
      zoom: 13,
      prevCoordObj: null,
      routeCoords: null
    }
  }

  componentDidUpdate() {
    // if the user has updated their location
    if ((this.props.lat !== this.state.lat) ||
     (this.props.lon !== this.state.lon)) {
        // set state to reflect the new coordinates
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
    this.setState({ zoom: e.target._zoom });
  }

  // auto open the pop-up
  openPopUp = (e) => {
    e.target.openPopup()
  }

  // get outward journey section of the coordinates
  outwardSection = () => {
    const routeCoordsLen = this.props.routeCoords? this.props.routeCoords.length: 0;
    const arrayHalved = routeCoordsLen > 0? Math.floor(routeCoordsLen/2): 0;

    if (this.props.routeCoords) {
      return this.props.routeCoords.slice(0, arrayHalved);
    }
  }

    // get return journey section of the coordinates
    returnSection = () => {
      const routeCoordsLen = this.props.routeCoords? this.props.routeCoords.length: 0;
      const arrayHalved = routeCoordsLen > 0? Math.floor(routeCoordsLen/2): 0;
  
      if (this.props.routeCoords) {
        return this.props.routeCoords.slice(arrayHalved, routeCoordsLen)
      }
    }

 
  render() {
    const position = [this.state.lat, this.state.lon];

    const preRouteLoad = (
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

    const postRouteLoad = (
      <Map center={position} onClick={(e) => this.updateCoords(e)} 
          onZoomend={(e) => this.zoomChangeHanlder(e)} zoom={this.state.zoom}>
        <TileLayer
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        
        <Polyline color="blue" positions={this.outwardSection()} />
        <Polyline color="red" opacity={0.7} positions={this.returnSection()} />
      </Map>
    )

    if (!this.props.routeCoords) {
      return preRouteLoad;
    } else {
      return postRouteLoad;
    } 
  }
};

export default MapDisplay;