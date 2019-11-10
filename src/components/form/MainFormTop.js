import React from 'react';
import Slider from './Slider';
import { Form } from 'semantic-ui-react';

// the top part of the main input form
const MainFormTop = ( { onDistanceInput, onSliderInputChange, maxGradient } ) =>
    (
     <Form>
        <Form.Group widths='equal'>
             <Form.Field>
             <label>Target distance (KM)</label>
                    <input type="text" onChange={ (e) => onDistanceInput(e) } 
                    placeholder="Distance (KM)" />
             </Form.Field>
             <Form.Field>
                     <label>Maximum gradient</label>
                    <Slider onSliderInputChange={onSliderInputChange}/>
             </Form.Field>
             <div className="maxGradientVal" style={{marginTop: '20px'}}>
                            {maxGradient}%
             </div>
        </Form.Group>
    </Form> 
);

export default MainFormTop;
