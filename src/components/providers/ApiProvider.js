import React from 'react';
import { useState, createContext } from 'react';
import Modal from '../Modal';
import axios from 'axios';

const ApiContext = createContext();

// manages the creation and dispatch of HTTP 
// requests to the server. Also renders modal
// 'spinner' while request is being sent.
const ApiProvider = ({ children }) => {
    const domain = "http://localhost:8080";

    const [modalText, setModalText] = useState("Generating route");
    const [modalActive, setModal] = useState(false);

    // send initial coordinates to API endpoint to begin generating 
    // the graph
    const sendCoords = (lat, lon) => {
        const query = `lat=${lat}&lon=${lon}`;
        const head = "/start/args?";
        
        axios.get(domain + head + query)
             .catch( (error) => console.log(error) );
    }

    // send full query to API in order to generate the path
    const sendRequest = async (options, lat, lon) => {
        setModalText("Generating route");

        const query = convertToQuery(options,lat,lon);
        
        // modal is active during graph generation
        setModal(true);

        const response = await axios
            .get(query)
            .catch( (error) => handleError(error) );

        // update modal text
        setModal(false);

        if (response) {
            return {
                routeCoords: parseCoords(response.data.pathNodes),
                routeName: response.data.startingWay,
                routeDistance: response.data.distance,
                routeGradient: response.data.averageGradient };
        };
    };

    // parse JSON response from server to retrieve the route
    // coordinates
    const parseCoords = (pathNodesArray) => {
        const coords = pathNodesArray.map( el => Object.keys(el)
        .filter( key => key !== "id") // remove the ids
        .map( key => el[key] )); // map to lat/lon values

        return coords;
    }

    const handleError = (error) => {
        let errorMessage;
        if (error.response) {
            errorMessage = error.response.data.message;
        } else {
            errorMessage = "Unable to reach the server";
        }
        setModalText(`Error: ${errorMessage}`);
        // keep modal on screen for two seconds
        return new Promise( resolve => setTimeout(resolve, 2000));
    }

    // take the user-specified options and return a string
    // matching the API    
    const convertToQuery = (options, lat, lon) => {
        const avoidedFeaturesBools = Object.values(options.avoidedFeatures)
        const preferredFeaturesBools = Object.values(options.preferredFeatures)
        const seperator = avoidedFeaturesBools.length === 0? "": "," 
        const head = "/route/args?";

        // convert KM to metres
        const distanceToMetres = options.distance * 1000;
        // convert to fraction
        const maxGradient = options.maxGradient/100;

        const query = domain + head
        + `lat=${lat.toFixed(6)}&lon=${lon.toFixed(6)}&`
        + `distance=${distanceToMetres}&maxGradient=${maxGradient}&`
        + `options=${avoidedFeaturesBools + seperator + preferredFeaturesBools}`

        return query;
    }

    return (
        <div>
            <Modal active={modalActive} text={modalText}>
            </Modal>
            <ApiContext.Provider value={{ sendCoords, sendRequest }}>
                { children }
            </ ApiContext.Provider> 
        </div>
    );
};
export { ApiContext, ApiProvider };