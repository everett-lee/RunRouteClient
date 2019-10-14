import StartCoordsRetriever from "../components/StartCoordsRetriever"; 
import MockApi from '../utils/MockApi';
import MockMap from '../utils/MockMap';
import App from "../components/App"; 
import React from "react";
import testRenderer from "react-test-renderer";

jest.mock('../components/api/Api', () => {
    const Api = () => MockApi;
    return Api;
  });

jest.mock('../components/map/MapDisplay', () => {
    const Map = () => MockMap;
    return Map;
  });

const mockGeolocation = {
    getCurrentPosition: jest.fn()
      .mockImplementationOnce((success) => Promise.resolve(success({
        coords: {
          latitude: 5,
          longitude: 11
        }
      })))
  };

global.navigator.geolocation = mockGeolocation;

describe("Test the location", () => {
    test("it response with coordinates when called", () => {
        let component;
        let instance;

        component = testRenderer.create(<StartCoordsRetriever />)
        instance = component.getInstance();
        instance.generateGraph = jest.fn( (x,y) => x + y);

        instance = component.getInstance();
        expect(instance.state.lat).toBe(13);
    });
});