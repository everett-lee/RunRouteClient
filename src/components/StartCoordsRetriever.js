import { useState, useEffect } from 'react';

// retrieves the user's coordinates on loading the map
const StartCoordsContainer = (props) => {   
    const [coords, setCoords] = useState([]);
    const [errorMsg, setErrorMsg] = useState([]);
     

    // get the current location from the user
    useEffect( () => {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude
                let lon = position.coords.longitude

                // update lat and lon in parent component
                setCoords( [lat, lon] );
                props.updateCoords(lat, lon);

                // send request to API to begin graph generation
                props.generateGraph(lat, lon);
            },
            (error) => setErrorMsg({errorMsg: error.message} 
            ))
    }, []);

    return null;
};
export default StartCoordsContainer;