import React from 'react';
// retrieves the user's coordinates on loading the map
class StartCoordsContainer extends React.Component {   
    constructor(props) {
        super(props);
        
        this.state = { errorMsg: null };
    }

    // get the current location from the user
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                // update lat and lon in parent component
                this.props.updateCoords(position.coords.latitude,
                    position.coords.longitude)
                
                // send request to API to begin graph generation
                this.props.generateGraph(position.coords.latitude,
                    position.coords.longitude)
            },
            (error) => this.setState({errorMsg: error.message}) 
        );
    }
    render() { 
        return null;
    }
};
export default StartCoordsContainer;