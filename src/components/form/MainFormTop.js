import React from 'react';
import Slider from './Slider';
import { Form } from 'semantic-ui-react';

// the top part of the main input form
const MainFormTop = (props) =>
    (
     <Form>
        <Form.Group widths='equal'>
             <Form.Field>
             <label>Target distance (KM)</label>
                    <input type="text" onChange={ (e) => props.onDistanceInput(e) } 
                    placeholder="Distance (KM)" />
             </Form.Field>
             <Form.Field>
                     <label>Maximum gradient</label>
                    <Slider onSliderInputChange={props.onSliderInputChange}/>
             </Form.Field>
             <div className="maxGradientVal" style={{marginTop: '20px'}}>
                            {props.maxGradient}%
             </div>
        </Form.Group>
    </Form> 
);

export default MainFormTop;
