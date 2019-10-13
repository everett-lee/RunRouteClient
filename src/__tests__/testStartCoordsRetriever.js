import StartCoordsRetriever from "../components/StartCoordsRetriever"; 
import MockApi from '../utils/MockApi';
import MockMap from '../utils/MockMap';
import App from "../components/App"; 
import React from "react";
import { create } from "react-test-renderer";

jest.mock('../components/api/Api', () => {
    const Api = () => MockApi;
    return Api;
  });

jest.mock('../components/map/MapDisplay', () => {
    const Map = () => MockMap;
    return Map;
  });

const mockObj = { coords: { latitude: 13, longitude: 8 } };
const mockGeolocation = {
    getCurrentPosition: jest.fn( () => mockObj),
};
  
global.navigator.geolocation = mockGeolocation;

describe("Test the location", () => {
    test("it response with coordinates when called", () => {
        const component = create(<App />);
        const instance = component.getInstance();
        expect(instance.state.lat).toBe(13);
    });
});