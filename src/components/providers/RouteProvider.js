import React, { useState, createContext } from 'react';

const RouteContext = createContext();

const RouteProvider = ({ children }) => {
    const initialState = {
        routeCoords: null,
        routeName: null,
        routeDistance: null,
        routeGradient: null };

    const [routeObject, setRouteObject] = useState(initialState);
    
    return (
        <RouteContext.Provider value={{ routeObject, setRouteObject }}>
             { children }
        </ RouteContext.Provider> 
        );
};

export { RouteContext, RouteProvider };