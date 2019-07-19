import React from 'react';
import Modal from '../Modal';
import axios from 'axios';

class Api extends React.Component {
    state = { modalActive: false,
              queryOptions: null,
              prevQueryOptions: null, 
              lat: this.props.lat,
              lon: this.props.lon,
              queryExecuted: false}

    componentDidUpdate() {
        // check that updated state is new
        if (this.state.queryOptions !== this.props.queryOptions) {
        
            this.setState({ queryOptions: this.props.queryOptions,
                            lat: this.props.lat,
                            lon:this.props.lon,
                            modalText: "Generating route"});
        }

        if (this.state.queryOptions != null &&
                (this.state.queryOptions !== this.state.prevQueryOptions)) {
                    this.convertToQuery(this.state.prevQueryOptions);

                    this.setState({ prevQueryOptions: this.state.queryOptions});
                }
    }

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
        return new Promise( resolve => setTimeout(resolve, 1000));
    }

    // take the user-specified options and return a string
    // matching the API    
    convertToQuery = () => {
        const options = this.state.queryOptions;

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

    render() {
        return <Modal active={this.state.modalActive} text={this.state.modalText}/>;
    }
}

export default Api;