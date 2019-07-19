import React from 'react';
import { shallow, configure, wrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import Api  from '../components/api/Api.js';
import axios from '../__mocks__/axios.js';

const URL = "http://localhost:8080/route/"

configure({adapter: new Adapter()});
describe('test modal reset on error', () => {
    it('issues a bad request and leaves modalActive in false state'
    , async  () => {
        // mock failed GET request
       axios.get.mockImplementationOnce(() => Promise.reject("nope"));

       const wrapper = shallow(<Api />);
       const func = wrapper.instance().sendRequest;
       const modalState = wrapper.instance().state.modalActive;
       expect(modalState).toBe(false);
       func("testvalue");
       expect(modalState).toBe(false);
     });
 });
 
configure({adapter: new Adapter()});
describe('test convert to query function', () => {
    it('produces query of the correct form'
    , () => {
       const options = { avoidedFeatures: {a: true, b: true},
                         preferredFeatures: {a: false, b: false},
                         distance: 15,
                         maxGradient: 25 }

        const lat = 50
        const lon = 0

       const wrapper = shallow(<Api />);
       const func = wrapper.instance().convertToQuery;
       expect(func(options, lat,lon))
         .toBe(URL + "coords=(50.000000,0.000000),distance=15000" +
         ",maxGradient=25,options=true,true,false,false")
        
     });
 });


 configure({adapter: new Adapter()});
describe('test convert to query function when features blank', () => {
    it('produces query of the correct form'
    , () => {
       const options = { avoidedFeatures: {},
                         preferredFeatures: {a: false, b: false},
                         distance: 15,
                         maxGradient: 25 }

        const lat = 50
        const lon = 0

       const wrapper = shallow(<Api />);
       const func = wrapper.instance().convertToQuery;
       expect(func(options, lat,lon))
         .toBe(URL + "coords=(50.000000,0.000000),distance=15000" +
         ",maxGradient=25,options=false,false")
        
     });
 });

 configure({adapter: new Adapter()});
describe('test convert to query function when options blank', () => {
    it('produces query of the correct form'
    , () => {
       const options = { avoidedFeatures: {},
                         preferredFeatures: {},
                         distance: 15,
                         maxGradient: 25 }

        const lat = 50
        const lon = 0

       const wrapper = shallow(<Api />);
       const func = wrapper.instance().convertToQuery;
       expect(func(options, lat,lon))
         .toBe(URL + "coords=(50.000000,0.000000),distance=15000" +
         ",maxGradient=25,options=")
        
     });
 });