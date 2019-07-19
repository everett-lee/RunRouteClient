import React from 'react';
import Modal from '../Modal';
import axios from 'axios';

class Api extends React.Component {
    state = { modalActive: false }

    async sendRequest(query) {
        this.setState({modalActive: true})
        console.log(query);

        const response = await axios
            .get(query)
            .catch( (error) => this.handleError() );
    
        const x = response;

        this.setState({modalActive: false})
    }

    handleError = () => {
        this.setState({ modalText: "Failed to generate route" });
        // keep modal on screen for one second
        return new Promise( resolve => setTimeout(resolve, 1000));
    }

    // take the user-specified options and return a string
    // matching the API    
    convertToQuery = (options, lat, lon) => {
        const avoidedFeaturesBools = Object.values(options.avoidedFeatures)
        const preferredFeaturesBools = Object.values(options.preferredFeatures)
        const mainURL = "http://localhost:8080/route/";

        // convert KM to metres
        const distanceToMetres = options.distance * 1000;

        const query = mainURL
        + `coords=(${lat.toFixed(6)},${lon.toFixed(6)}),`
        + `distance=${distanceToMetres},maxGradient=${options.maxGradient},`
        + `options=${avoidedFeaturesBools + "," + preferredFeaturesBools}`
    
        this.sendRequest(query);
    }

    render() {
        return <br/>;
    }
}

export default Api;