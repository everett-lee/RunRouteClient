import { useState, useEffect, useContext } from 'react';
import { CoordContext } from './providers/CoordProvider';
import { ApiContext } from './providers/ApiProvider';

// retrieves the user's coordinates on loading the map
const StartCoordsContainer = (props) => {   
    const [errorMsg, setErrorMsg] = useState([]);

    const coordsContext = useContext(CoordContext);
    const apiContext = useContext(ApiContext);

    // get the current location from the user
    useEffect( () => {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude
                let lon = position.coords.longitude
                // update lat and lon in context
                coordsContext.setCoords( { lat, lon });
                
                // send request to API to begin graph generation
                apiContext.sendCoords(lat, lon);
            },
            (error) => setErrorMsg({errorMsg: error.message} 
            ))
    }, []);

    return null;
};
export default StartCoordsContainer;