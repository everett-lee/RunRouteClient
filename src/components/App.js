import React, { useContext, useState } from 'react';
import { Sidebar } from 'semantic-ui-react';

import MapDisplay from './map/MapDisplay';
import Options from './form/Options';
import RouteDetailsSegment from './RouteDetailsSegment';
import StartCoordsRetriever from './StartCoordsRetriever';
import SidebarSection from './sidebar/SidebarSection';

import { ApiContext } from './providers/ApiProvider';
import { CoordContext } from './providers/CoordProvider';

const App = () => {
    const apiContext = useContext(ApiContext);
    const coordContext = useContext(CoordContext);

    const nullRoute = {
        routeCoords: null,
        routeName: null,
        routeDistance: null,
        routeGradient: null }

    const [routeObject, setRouteObject] = useState(nullRoute);
    const [sideBarSegments, setsideBarSegments] = useState([]);
   
    // send request to server containing coordinates along with
    // the route parameters  
    const makeRequest = (options) => {
        const coords = coordContext.coords;
        const response = apiContext.sendRequest(options, coords.lat, coords.lon);

        // update state with returned coordinates and updated map setting
        response.then ( routeObject => {
            setRouteObject(routeObject || nullRoute);
        });
    }

    // reset routeCoords. Causes map to re-render to default position
    const resetMap = () => {
        // if an unsaved route has been generated
        if (routeObject.routeName) {
            // the number of generated routes
            const key = sideBarSegments.length
            
            const sidebarRouteObject = { name: routeObject.routeName,
                            distance: routeObject.routeDistance,
                            routeCoords: routeObject.routeCoords, 
                            gradient: routeObject.routeGradient,
                            key: key };
                
            // push route to the sidebar
            setsideBarSegments(sideBarSegments.concat([sidebarRouteObject]));
        }
        setRouteObject(nullRoute);
    }

    // retrieves old route when corresponding sidebar button is clicked
    const reloadOldRoute = (routeCoords, routeName, routeDistance, routeGradient) => {
        setRouteObject( { routeCoords, routeName, routeDistance, routeGradient } )
    }

    const renderSidebarSections = () => {
        return (
            sideBarSegments.map( (item) => {
            // render each route from the route object created by the
            // reset map method
            return <SidebarSection routeCoords={ item.routeCoords }
                                   name={ item.name }
                                   distance ={ item.distance }
                                   gradient = { item.gradient }
                                   key={ item.key } 
                                   reloadOldRoute={ reloadOldRoute } />
        })
        );
    }

    return (
        <div>
                <Sidebar visible={true}>
                        { renderSidebarSections() }
                </Sidebar>
                <div className="ui container">
                    <Options makeRequest={ makeRequest }
                            resetMap={ resetMap } />
                    <RouteDetailsSegment
                                        coords={ coordContext.coords}
                                        routeName={ routeObject.routeName }
                                        routeDistance={ routeObject.routeDistance }
                                        routeGradient={ routeObject.routeGradient } />
                    <div className="map-display-div">
                        <MapDisplay routeCoords={ routeObject.routeCoords } />                
                    </div>
                    <StartCoordsRetriever />
                </div>
        </div>
        );
};

export default App;