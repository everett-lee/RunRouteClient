import React from 'react';
import { shallow, mount, configure, wrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import App  from '../components/App.js';
import Api  from '../components/api/Api.js';
import Modal from '../__mocks__/Modal.js';

configure({adapter: new Adapter()});
describe('Test original state of coords', () => {
    it('Coords are 51.505, -0.09', () => {
       const appInstance = shallow(<App />);
       expect(appInstance.state('lat')).toBe(51.505);
       expect(appInstance.state('lon')).toBe(-0.09);
     });
 });
