import React from 'react';
import CheckBox from './CheckBox';
import Slider from './Slider';

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
                       maxGradient: 25,
                       avoidedFeatures: avoidedFeaturesObject,
                       preferredFeatures: preferredFeaturesObject};
    }

    // update state on change to slider value
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
            <div className="ui segment">
                <div className="ui equal width form">
                    <div className="fields">
                    <div className="field">
                        <label>Distance (KM)</label>
                        <input type="text" onChange={(e) => this.setState({distance: e.target.value})} 
                        placeholder="Distance (KM)" />
                    </div>
                    <div className="field" style={{marginLeft: '25px'}}>
                        <label>Maximum gradient</label>
                        <Slider onSliderInputChange={this.onSliderInputChange}/>    
                    </div>
                        <div className="maxGradientVal" style={{marginTop: '20px'}}>
                            {this.state.maxGradient}%
                        </div>
                    </div>
                    <div className="ui equal width form">
                        <div className="fields">
                            <div className="field">
                                <label>Features to avoid</label>
                                <div>
                                    <CheckBox onInputChange={this.onAvoidedFeaturesButtonInputChange} 
                                    arg ="majorRoads" label="Major roads"/>
                                </div>
                                <div>
                                    <CheckBox onInputChange={this.onAvoidedFeaturesButtonInputChange} 
                                    arg = "steps" label="Steps"/>
                                </div>
                                <div>
                                    <CheckBox onInputChange={this.onAvoidedFeaturesButtonInputChange} 
                                    arg = "concrete" label="Concrete"/>
                                </div>
                                <div>
                                    <CheckBox onInputChange={this.onAvoidedFeaturesButtonInputChange} 
                                    arg = "unlit" label="Unlit streets"/>
                                </div>
                            </div>
                            <div className="field">
                                <label>Preferred features</label>
                                <div>
                                    <CheckBox onInputChange={this.onPreferredFeaturesButtonInputChange} 
                                            arg="uphill" label="Uphill routes"/>
                                </div>
                                <div>
                                    <CheckBox onInputChange={this.onPreferredFeaturesButtonInputChange} 
                                            arg="residential" label="Residential streets"/>
                                </div>
                                <div>
                                    <CheckBox onInputChange={this.onPreferredFeaturesButtonInputChange} 
                                            arg="grassOrDirt" label="Grass or dirt sufaces"/>
                                </div>
                                <div>
                                    <CheckBox onInputChange={this.onPreferredFeaturesButtonInputChange} 
                                            arg="backroads" label="Backroads and pathways"/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <button onClick={ () => this.props.makeRequest(this.state) } className="ui button">
                    Find route
                </button>
                <button onClick={ () => this.props.resetMap() } className="ui button">
                    Reset map
                </button>
            </div>
        )
    }    
}
export default Options;