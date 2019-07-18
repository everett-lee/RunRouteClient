import React from 'react';
class StartCoordsContainer extends React.Component {   
    constructor(props) {
        super(props);
        
        this.state = { errorMsg: null };
    }

    // get the current location from the user
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.props.updateCoords(position.coords.latitude,
                    position.coords.longitude)
            },
            (error) => this.setState({errorMsg: error.message}) 
        );
    }

    // component did update => send API request to generate graph
    render() { 
        return null;
    }
};
export default StartCoordsContainer;