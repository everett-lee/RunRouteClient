import React from 'react';
import Modal from '../Modal';
import axios from 'axios';

class Api extends React.Component {
    state = { modalActive: false,
              modalText: "Generating route"}

    // send initial coordinates to API endpoint to begin generating 
    // the graph
    sendCoords = (lat, lon) => {
        const mainURL = "http://localhost:8080/start/";
        const query = `coords=(${lat},${lon})`;
        
        axios.get(mainURL + query)
             .catch( (error) => console.log(error) );
    }

    // send full query to API in order to generate the path
    async sendRequest(options, lat, lon) {
        const query = this.convertToQuery(options,lat,lon);

        // modal is active during graph generation
        this.setState({modalActive: true})
        console.log(query);

        const response = await axios
            .get(query)
            .catch( (error) => this.handleError(error) );

        // update modal text
        this.setState({modalActive: false,
                       modalText: "Generating route"});

        console.log(response)
        return response;
    }

    handleError = (error) => {
        let errorMessage;
        if (error.response) {
            errorMessage = error.response.data.message
        } else {
            errorMessage = "Unable to reach the server"
        }
        this.setState({ modalText: `Error: ${errorMessage}` });
        // keep modal on screen for two seconds
        return new Promise( resolve => setTimeout(resolve, 2000));
    }

    // take the user-specified options and return a string
    // matching the API    
    convertToQuery = (options, lat, lon) => {
        const avoidedFeaturesBools = Object.values(options.avoidedFeatures)
        const preferredFeaturesBools = Object.values(options.preferredFeatures)
        const mainURL = "http://localhost:8080/route/";
        const seperator = avoidedFeaturesBools.length === 0? "": "," 

        // convert KM to metres
        const distanceToMetres = options.distance * 1000;
        // convert to fraction
        const maxGradient = options.maxGradient/100;

        const query = mainURL
        + `coords=(${lat.toFixed(6)},${lon.toFixed(6)}),`
        + `distance=${distanceToMetres},maxGradient=${maxGradient},`
        + `options=${avoidedFeaturesBools + seperator + preferredFeaturesBools}`

        return query;
    }

    render() {
        return <Modal active={this.state.modalActive} text={this.state.modalText}/>;
    }
}

export default Api;