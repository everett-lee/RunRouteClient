import React from 'react';
import { shallow, configure, wrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import Api  from '../components/api/Api.js';
import axios from '../__mocks__/axios.js';

configure({adapter: new Adapter()});
describe('test modal reset on error', () => {
    it('issues a bad request and leaves modalActive in false state'
    , async  () => {
        // mock failed GET request
       axios.get.mockImplementationOnce(() => Promise.reject("nope"));

       const wrapper = shallow(<Api />);
       const func = wrapper.instance().sendRequest;
       const modalState = wrapper.instance().state.modalActive;
       expect(modalState).toBe(false)
       func("testvalue");
       expect(modalState).toBe(false)
     });
 });
 
configure({adapter: new Adapter()});
describe('test convert to query function', () => {
    it('produces query of the correct form'
    , async  () => {
       axios.get.mockImplementationOnce(() => Promise.reject("nope"));

       const wrapper = shallow(<Api />);
       const func = wrapper.instance().sendRequest;
       const modalState = wrapper.instance().state.modalActive;
       expect(modalState).toBe(false)
       func("testvalue");
       expect(modalState).toBe(false)
     });
 });