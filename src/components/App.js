import React from 'react';
import axios from 'axios';
import Options from './form/Options'

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
        <div className="ui container">
            <Options updateQueryRequest={this.updateQueryRequest} />
        </div>
        )
    }
};

export default App;