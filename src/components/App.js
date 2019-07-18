import React from 'react';
import MapDisplay from './map/MapDisplay';
import Options from './form/Options';
import Modal from './Modal';
import StartCoordsContainer from './StartCoordsContainer';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { lat: 51.505,
                        lon: -0.09,
                        modalActive: false}
    }


    async sendRequest(query) {
        this.setState({modalActive: true})
        console.log(query);

        const response = await axios
            .get(query);
    
        const x = response;
        // how to handle errors?
        console.log(x);
        this.setState({modalActive: false})
    }

    // take the user-specified options and return a string
    // matching the API    
    convertToQuery = (options) => {
        const avoidedFeaturesBools = Object.values(options.avoidedFeatures)
        const preferredFeaturesBools = Object.values(options.preferredFeatures)
        const mainURL = "http://localhost:8080/route/";

        const distanceToMetres = options.distance * 1000;

        const query = mainURL
        + `coords=(${this.state.lat.toFixed(6)},${this.state.lon.toFixed(6)}),`
        + `distance=${distanceToMetres},maxGradient=${options.maxGradient},`
        + `options=${avoidedFeaturesBools + "," + preferredFeaturesBools}`
    
        this.sendRequest(query);
    }

    // receive input data from the the form in the Options class
    updateQueryRequest = (options) =>  {
        this.convertToQuery(options);
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
            <Options updateQueryRequest={this.updateQueryRequest} />
            <Modal active={this.state.modalActive}/>
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