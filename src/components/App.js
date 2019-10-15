import React, { useContext } from 'react';
import { Sidebar } from 'semantic-ui-react';

import MapDisplay from './map/MapDisplay';
import Options from './form/Options';
import RouteDetailsSegment from './RouteDetailsSegment';
import StartCoordsRetriever from './StartCoordsRetriever';
import SidebarSection from './sidebar/SidebarSection';

import { ApiContext } from './api/ApiProvider';
import { CoordContext } from './CoordProvider';

const App = () => {
    const apiContext = useContext(ApiContext);
    const coordContext = useContext(CoordContext);

    const state = { lat: 51.505,
                       lon: -0.09,
                       queryResponseObj: null,
                       routeCoords: null,
                       routeName: null,
                       routeDistance: null,
                       routeGradient: null,
                       sideBarSegments: [] }   
    
    // send request to server containing coordinates along with
    // the route parameters  
    const makeRequest = (options) => {
        const coords = coordContext.coords;
        const response = apiContext.sendRequest(options, coords.lat, coords.lon);

        console.log(response);
        // update state with returned coordinates and updated map setting
    }

    // update the coordinates from a child component
    const updateCoords = (lat, lon) => {
         // update it
    }

    // reset routeCoords. Causes map to re-render to default position
    const resetMap = () => {
        // if an unsaved route has been loaded
        if (state.queryResponseObj) {
            // the number of generated routes
            const key = state.sideBarSegments.length
            
            var routeObject = null;
            // if a route has been generated 
            if (state.routeCoords) {
                routeObject = { name: state.routeName,
                                distance: state.routeDistance,
                                routeCoords: state.routeCoords, 
                                gradient: state.routeGradient,
                                key: key };
                
                // push route to the sidebar
                state.sideBarSegments.push(routeObject);                ;
            }
        }

        state.routeCoords = null;
    }

    // retrieves old route when corresponding sidebar button is clicked
    const reloadOldRoute = (routeCoords, name, distance, gradient) => {
        state.routeCoords = routeCoords;
        state.routeName = name;
        state.routeDistance = distance;
        state.routeGradient = gradient;
        state.queryResponseObj = null;
    }

    const renderSidebarSections = () => {
        return (
            state.sideBarSegments.map( (item) => {
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
                    <RouteDetailsSegment routeName={ state.routeName }
                                        routeDistance={ state.routeDistance }
                                        routeGradient={ state.routeGradient } />
                    <div className="map-display-div">
                    <MapDisplay lat={ state.lat } lon={ state.lon }
                                updateCoords={ updateCoords }
                                routeCoords={ state.routeCoords } />                
                    </div>
                    <StartCoordsRetriever />
                </div>
        </div>
        );
};

export default App;