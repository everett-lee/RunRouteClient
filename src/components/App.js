import React from 'react';
import MapDisplay from './map/MapDisplay';
import Options from './form/Options';
import Api from './api/Api';
import StartCoordsContainer from './StartCoordsContainer';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { lat: 51.505,
                        lon: -0.09,
                        queryOptions: null}
    }

    // receive input data from the the form in the Options class
    makeRequest = (options) => {
        this.setState({queryOptions: options,
                       lat: this.state.lat,
                       lon: this.state.lon });
    }

    // update the coordinates from a child component
    updateCoords = (lat, lon) => {
         this.setState({ lat: lat,
                         lon: lon });
    }

    render() {
        return (
        <div>
        <div className="ui container">
            <Options makeRequest={this.makeRequest} />
            <Api queryOptions={this.state.queryOptions} 
                 lat={this.state.lat} lon={this.state.lon} />
            <div className="map-display-div">
            <MapDisplay lat={this.state.lat} lon={this.state.lon}
                        updateCoords={this.updateCoords} />                
            </div>
            <StartCoordsContainer updateCoords={this.updateCoords} />
        </div>
        </div>
        )
    }
};

export default App;