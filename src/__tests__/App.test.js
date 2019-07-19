import React from 'react';
import { shallow, configure, wrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import App  from '../components/App.js';

configure({adapter: new Adapter()});
describe('Test original state of coords', () => {
    it('Coords are 51.505, -0.09', () => {
       const instance = shallow(<App />);
       expect(instance.state('lat')).toBe(51.505);
       expect(instance.state('lon')).toBe(-0.09);
     });
 });
 