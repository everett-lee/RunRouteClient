import React from 'react';
import Modal from '../Modal';
import axios from 'axios';

class Api extends React.Component {
    state = { modalActive: false,
              queryOptions: null,
              prevQueryOptions: null, 
              lat: this.props.lat,
              lon: this.props.lon}

    componentDidUpdate() {
        const currentQueryOptions = this.state.queryOptions;
        const newQueryOptions = this.props.queryOptions;

        if (this.state.queryOptions !== this.props.queryOptions
             || (this.state.lat !== this.props.lat || this.state.lon !== this.props.lon)) {
        
            this.setState({ queryOptions: this.props.queryOptions,
                            lat: this.props.lat,
                            lon:this.props.lon});
        }

        if (this.state.queryOptions != null &&
                (this.state.queryOptions !== this.state.prevQueryOptions)) {
                    this.convertToQuery(this.state.prevQueryOptions);

                    this.setState({ prevQueryOptions: this.state.queryOptions });
                }
    }

    async sendRequest(query) {
        this.setState({modalActive: true})
        console.log(query);

        const response = await axios
            .get(query);
    
        const x = response;

        console.log(x);
        this.setState({modalActive: false})
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
        return <Modal active={this.state.modalActive}/>;
    }
}

export default Api;