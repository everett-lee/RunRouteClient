import React from 'react';
import App from '../components/App.js';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup)

// mock the map
jest.mock('../components/map/MapDisplay', () => {
    const MapDisplay = () => <div />;
    return MapDisplay;
})

// mock the coord provider from the coordinates context 
jest.mock('../components/providers/CoordProvider', () => {
    return { CoordContext: { coords: { lat: 51.505, lon: -0.09  }} };
})

// mock the api provided method from the api context
jest.mock('../components/providers/ApiProvider', () => {
    const route = {
        routeCoords: [[51,50], [50, 49], [49, 48]],
        routeName: "Test route",
        routeDistance: 5000,
        routeGradient: -11 };

    return { ApiContext: { sendRequest: (a,b,c) => {
        return new Promise (
            (resolve, reject) => resolve? resolve(route): reject(new Error()));
    }} }
})

// mock useContext
jest.mock('react', () => {
    const RealReact = require.requireActual('react')
    return {
        ...RealReact,
        useContext: arg => arg
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

test('Displays updated route details when api reponse recieved', async () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText("Find route"))

    // the distance is updated after successful api call
    const distanceDisplay = await getByText(/Distance/);
    expect(distanceDisplay.textContent).toContain(5)

    // the gradient is upadated after successful api call
    const gradientDisplay = await getByText(/Average gradient/);
    expect(gradientDisplay.textContent).toContain(-11)
});

test('Stores route to the sidebar when saved', async () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText("Find route"))

    const distanceDisplay = await getByText(/Distance/);
    expect(distanceDisplay.textContent).toContain(5)

    fireEvent.click(getByText("Save route"))

    // the sidebar is updated with the displayed route 
    // on saving 
    const sideBarDisplay = await getByText(/Test route/);
    expect(sideBarDisplay.textContent).toContain("Test")
});
