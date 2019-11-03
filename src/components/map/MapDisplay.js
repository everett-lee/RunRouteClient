import React, { useState, useContext }  from 'react';

import { Map, Marker, TileLayer, Polyline }  from 'react-leaflet';
import { CoordContext } from '../providers/CoordProvider';

// main map display class for presenting the current
// location and route
const MapDisplay = (props) => {

  const coordsContext = useContext(CoordContext);
  const [zoom, setZoom] = useState(13);

  // update current position based on click. This invokes the
  // coordinates context provider component method
  const updateCoords = (e) => {
    
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;

    coordsContext.setCoords( { lat, lon });
  };

  // update zoom state when map view changed
  const zoomChangeHanlder = (e) => {
    setZoom(e.target._zoom);
  };

  // get outward journey section of the coordinates
  const outwardSection = () => {
    const routeCoordsLen = props.routeCoords? props.routeCoords.length: 0;
    const arrayHalved = routeCoordsLen > 0? Math.floor(routeCoordsLen/2): 0;

    if (props.routeCoords) {
      return props.routeCoords.slice(0, arrayHalved);
    }
  };

  // get return journey section of the coordinates
  const returnSection = () => {
    const routeCoordsLen = props.routeCoords? props.routeCoords.length: 0;
    const arrayHalved = routeCoordsLen > 0? Math.floor(routeCoordsLen/2): 0;
  
    if (props.routeCoords) {
      return props.routeCoords.slice(arrayHalved - 1, routeCoordsLen);
    }
  };

  const position = [coordsContext.coords.lat, coordsContext.coords.lon];

  // map to display without route
  const preRouteLoad = (
    <Map center={position} onmouseDown={(e) => updateCoords(e)} 
        onZoomend={(e) => zoomChangeHanlder(e)} zoom={zoom}>
      <TileLayer
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      <Marker position={position} >
      </Marker>
    </Map>
  );

  // map to display when the route has been loaded 
  const postRouteLoad = (
    <Map center={position} onClick={(e) => updateCoords(e)} 
        onZoomend={(e) => zoomChangeHanlder(e)} zoom={zoom}>
      <TileLayer
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
        
      <Polyline color="blue" positions={outwardSection()} />
      <Polyline color="red" opacity={0.7} positions={returnSection()} />
    </Map>
  );

    if (!props.routeCoords) {
      return preRouteLoad;
    } else {
      return postRouteLoad;
    } 
};

export default MapDisplay;  