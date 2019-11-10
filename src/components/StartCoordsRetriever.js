import { useEffect, useContext } from 'react';
import { CoordContext } from './providers/CoordProvider';
import { ApiContext } from './providers/ApiProvider';

// retrieves the user's coordinates on loading the map
const StartCoordsContainer = () => {

    const coordsContext = useContext(CoordContext);
    const apiContext = useContext(ApiContext);

    // get the current location from the user once
    // on first load 
    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                // update lat and lon in context
                coordsContext.setCoords({ lat, lon });

                // send request to API to begin graph generation
                apiContext.sendCoords(lat, lon);
            },
            (error) => console.log(error)
        );
    }, []);

    return null;
};
export default StartCoordsContainer;