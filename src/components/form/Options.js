import React from 'react';
import MainFormTop from './MainFormTop';
import MainFormMid from './MainFormMid';
import { Segment } from 'semantic-ui-react';

// used to provide paramaters for the route
// generation process
class Options extends React.Component {
    constructor(props) {
        super(props);
        
        const avoidedFeaturesObject =
         {majorRoads: false, 
          steps: false,
          concrete: false,
          unlit: false};

        const preferredFeaturesObject =
         { uphill: false, 
           residential: false, 
           backroads: false, 
           grassOrDirt: false,
           };

        this.state = { distance: null,
                       maxGradient: 15,
                       avoidedFeatures: avoidedFeaturesObject,
                       preferredFeatures: preferredFeaturesObject};
    }

    // update distance on input
    onDistanceInput = (event) => {
        this.setState({ distance: event.target.value });
    }

    // update max gradient on change to slider value
    onSliderInputChange = (event)=> {
        this.setState({ maxGradient: event.target.value });
    }

    // handles clicks for checkbox options
    onAvoidedFeaturesButtonInputChange = (option) =>  {
        const currentBool = this.state.avoidedFeatures[option];
        const avoidedFeaturesObject = this.state.avoidedFeatures;
        
        // negate the current value when the checkbox is clicked
        avoidedFeaturesObject[option] = !currentBool;

        this.setState({avoidedFeatures: avoidedFeaturesObject});
    }

    // handles clicks for checkbox options
    onPreferredFeaturesButtonInputChange = (option) =>  {
        const currentBool = this.state.preferredFeatures[option];
        const preferredFeaturesObject = this.state.preferredFeatures;
        
        // negate the current value when the checkbox is clicked
        preferredFeaturesObject[option] = !currentBool;

        this.setState({preferredFeatures: preferredFeaturesObject});
    }

    render (props) {
        return (
            <Segment>
                <MainFormTop 
                    onSliderInputChange={ this.onSliderInputChange }
                    onDistanceInput={ this.onDistanceInput }
                    maxGradient={ this.state.maxGradient }
                />
                <MainFormMid
                    onAvoidedFeaturesButtonInputChange={ this.onAvoidedFeaturesButtonInputChange }
                    onPreferredFeaturesButtonInputChange={ this.onPreferredFeaturesButtonInputChange }
                />
                <button onClick={ () => this.props.makeRequest(this.state) } className="ui button">
                    Find route
                </button>
                <button onClick={ () => this.props.resetMap() } className="ui button">
                    Save route
                </button>
            </Segment>
        )
    }    
}
export default Options;