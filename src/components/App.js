import React from 'react';
import MapDisplay from './map/MapDisplay';
import Options from './form/Options';
import Api from './api/Api';
import StartCoordsRetriever from './StartCoordsRetriever';
import SidebarSection from './sidebar/SidebarSection';
import { Sidebar } from 'semantic-ui-react';
import RouteDetailsSegment from './RouteDetailsSegment';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { lat: 51.505,
                       lon: -0.09,
                       queryResponseObj: null,
                       routeCoords: null,
                       routeName: null,
                       routeDistance: null,
                       routeGradient: null,
                       sideBarSegments: [] }

        this.apiRef = React.createRef();    
    }

    // use initial coordinates to start graph generation
    generateGraph = (lat, lon) => {
        this.apiRef.current.sendCoords(lat, lon);
    }
    
    // send request to server containing coordinates along with
    // the route parameters  
    makeRequest = (options) => {
        const response = this.apiRef.current.sendRequest(options, this.state.lat, this.state.lon);

        // update state with returned coordinates and updated map setting
        response.then( (value) => {
            if (value) {
                console.log(value) 
                if (value.data) {
                    this.setState(
                        { queryResponseObj: value.data,
                        routeCoords: this.parseCoords(value.data.pathNodes),
                        routeName: value.data.startingWay,
                        routeDistance: value.data.distance,
                        routeGradient: value.data.averageGradient }
                    )
                }
            }   
        });
    }

    // parse JSON response from server to retrieve the route
    // coordinates
    parseCoords = (pathNodesArray) => {
        const coords = pathNodesArray.map( el => Object.keys(el)
        .filter( key => key !== "id") // remove the ids
        .map( key => el[key] )); // map to lat/lon values

        return coords
    }

    // update the coordinates from a child component
    updateCoords = (lat, lon) => {
         this.setState({ lat: lat,
                         lon: lon });
    }

    // reset routeCoords. Causes map to re-render to default position
    resetMap = () => {
        // if a unsaved route has been loaded
        if (this.state.queryResponseObj) {
            // number of generated routes
            const key = this.state.sideBarSegments.length
            
            var routeObject = null;
            // if a route has been generated 
            if (this.state.routeCoords) {
                routeObject = { name: this.state.routeName,
                                distance: this.state.routeDistance,
                                routeCoords: this.state.routeCoords, 
                                gradient: this.state.routeGradient,
                                key: key };
            }
            
            if (routeObject) {
                this.state.sideBarSegments.push(routeObject);
            }
        }

        this.setState({ routeCoords: null });
    }


    // retrieves old route when corresponding sidebar button is clicked
    reloadOldRoute = (routeCoords, name, distance, gradient) => {
        this.setState({ routeCoords: routeCoords,
                        routeName: name,
                        routeDistance: distance,
                        routeGradient: gradient,
                        queryResponseObj: null });
    }

    renderSidebarSections = () => {
        return (
        this.state.sideBarSegments.map( (item) => {
            // render each route from the route object created by the
            // reset map method
            return <SidebarSection routeCoords={ item.routeCoords }
                                   name={ item.name }
                                   distance ={ item.distance }
                                   gradient = { item.gradient }
                                   key={ item.key } 
                                   reloadOldRoute={ this.reloadOldRoute } />
        })
        );
    }

    render() {
        return (
        <div>
            <Sidebar visible={true}>
                    { this.renderSidebarSections() }
            </Sidebar>
            <div className="ui container">
                <Options makeRequest={ this.makeRequest }
                        resetMap={ this.resetMap } />
                <Api ref={ this.apiRef } />
                <RouteDetailsSegment routeName={ this.state.routeName }
                                    routeDistance={ this.state.routeDistance }
                                    routeGradient={ this.state.routeGradient } />
                <div className="map-display-div">
                <MapDisplay lat={ this.state.lat } lon={ this.state.lon }
                            updateCoords={ this.updateCoords }
                            routeCoords={ this.state.routeCoords } />                
                </div>
                <StartCoordsRetriever updateCoords={ this.updateCoords }
                                    generateGraph={ this.generateGraph } />
            </div>
        </div>
        )
    }
};

export default App;