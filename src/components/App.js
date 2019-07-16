import React from 'react';
import MapDisplay from './map/MapDisplay';
import Options from './form/Options';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { queryRequestOptions: null };
    }

    // take the user-specified options and produce a string
    // matching the API    
    convertToQuery = (options) => {
        const avoidedFeaturesBools = Object.values(options.avoidedFeatures)
        const preferredFeaturesBools = Object.values(options.preferredFeatures)
        
        console.log(`coords=(50,0),distance=${options.distance},
        avoidedFeatures=[${avoidedFeaturesBools}],preferredFeatures=[${preferredFeaturesBools}]`)
    }

    // receive input data from the the form in the Options class
    updateQueryRequest = (options) =>  {
        this.convertToQuery(options);
    }

    render() {
        return (
        <div>
        <div className="ui container">
            <Options updateQueryRequest={this.updateQueryRequest} />
            <div className="map-display-div">
            <MapDisplay />
            </div>
        </div>
        </div>
        )
    }
};

export default App;