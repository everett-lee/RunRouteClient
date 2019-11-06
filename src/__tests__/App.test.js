import React from 'react';
import App from '../components/App.js';
import { render, fireEvent, cleanup } from '@testing-library/react';

import routePromise from '../__mocks__/routePromise';

afterEach(cleanup)

// mock the coord provider from the coordinates context 
jest.mock('../components/providers/CoordProvider', () => {
    return { CoordContext: { coords: { lat: 51.505, lon: -0.09  }} };
})

// mock the api provided method from the api context
jest.mock('../components/providers/ApiProvider', () => {
    const route = {
        routeCoords: {lat: 11, lon: 50},
        routeName: "Test route",
        routeDistance: 5,
        routeGradient: -11 };

    return { ApiContext: { sendRequest: (a,b,c) => {
        return new Promise (
            (resolve, reject) => resolve(route));
    }} }
})

// mock useContext
jest.mock('react', () => {
    const RealReact = require.requireActual('react')
    return {
        ...RealReact,
        useContext: arg => arg,
    }
})

// mock the geolocation api
const mockGeolocation = {
    getCurrentPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;

test('Successful display of start coords', () => {
    const { getByText } = render(<App />);

    const lat = 51.505.toFixed(2);
    const lon = -0.09.toFixed(2);

    const res = getByText(/Route start/);
    expect(res.textContent).toContain(`(${lat}, ${lon})`)
});

test('Displays updated route details when api reponse recieved', () => {
    const { queryByText, getByText } = render(<App />);
    
    fireEvent.click(getByText("Find route"))

    // // the modal appears in the DOM after sign up is clicked 
    // expect(getByText(/register/i).textContent).toBe('Register');
});
