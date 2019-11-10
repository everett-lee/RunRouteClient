import React, { useState, createContext } from 'react';

const CoordContext = createContext();

const CoordProvider = ({ children }) => {
    const initialState = { lat: 51.505, lon: -0.09 };
    const [coords, setCoords] = useState(initialState);

    return (
        <CoordContext.Provider value={{ coords, setCoords }}>
            {children}
        </ CoordContext.Provider>
    );
};

export { CoordContext, CoordProvider };