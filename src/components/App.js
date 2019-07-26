import React from 'react';
import MapDisplay from './map/MapDisplay';
import Options from './form/Options';
import Api from './api/Api';
import StartCoordsRetreiver from './StartCoordsRetreiver';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { lat: 51.505,
                       lon: -0.09,
                       routeCoordsObj: null}

        this.apiRef = React.createRef();    
    }

    // use initial coordinates to start graph generation
    generateGraph = (lat, lon) => {
        this.apiRef.current.sendCoords(lat, lon);
    }
    
    // receive input data from the the form in the Options class
    makeRequest = (options) => {
        const response = this.apiRef.current.sendRequest(options, this.state.lat, this.state.lon);
        
        // update state with returned coordinates and updated mat setting
        response.then( (value) => this.setState({ routeCoordsObj: value.data}));
    }

    // update the coordinates from a child component
    updateCoords = (lat, lon) => {
         this.setState({ lat: lat,
                         lon: lon });
    }

    // reset routeCoords. Causes map to rerender to default position
    resetMap = () => {
        this.setState({ routeCoordsObj: null })
    }


    render() {
        return (
        <div>
        <div className="ui container">
            <Options makeRequest={this.makeRequest}
                     resetMap={this.resetMap} />
            <Api ref={this.apiRef} />
            <div className="map-display-div">
            <MapDisplay lat={this.state.lat} lon={this.state.lon}
                        updateCoords={this.updateCoords}
                        routeCoordsObj={this.state.routeCoordsObj} />                
            </div>
            <StartCoordsRetreiver updateCoords={this.updateCoords}
                                  generateGraph={this.generateGraph} />
        </div>
        </div>
        )
    }
};

export default App;