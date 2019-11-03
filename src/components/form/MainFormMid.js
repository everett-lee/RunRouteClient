import React from 'react';
import { Form } from 'semantic-ui-react';
import CheckBox from './CheckBox';

// the middle part of the main input form
const MainFormMid = (props) =>
    (
            <Form>
                <Form.Group widths='equal'>
                     <Form.Field>
                        <label>Features to avoid</label>
                        <div>
                            <CheckBox onInputChange={props.onAvoidedFeaturesButtonInputChange} 
                            arg="majorRoads" label="Major roads"/>
                        </div>
                        <div>
                            <CheckBox onInputChange={props.onAvoidedFeaturesButtonInputChange} 
                            arg = "steps" label="Steps"/>
                        </div>
                        <div>
                            <CheckBox onInputChange={props.onAvoidedFeaturesButtonInputChange} 
                            arg = "concrete" label="Concrete"/>
                        </div>
                        <div>
                            <CheckBox onInputChange={props.onAvoidedFeaturesButtonInputChange} 
                            arg = "unlit" label="Unlit streets"/>
                        </div>
                     </Form.Field>
                     <Form.Field>
                        <label>Preferred features</label>
                        <div>
                            <CheckBox onInputChange={props.onPreferredFeaturesButtonInputChange} 
                            arg="uphill" label="Prefer uphill"/>
                        </div>
                        <div>
                            <CheckBox onInputChange={props.onPreferredFeaturesButtonInputChange} 
                            arg="residential" label="Residential streets"/>
                        </div>
                        <div>
                            <CheckBox onInputChange={props.onPreferredFeaturesButtonInputChange} 
                            arg="grassOrDirt" label="Unpaved sufaces"/>
                        </div>
                        <div>
                            <CheckBox onInputChange={props.onPreferredFeaturesButtonInputChange} 
                            arg="backroads" label="Backroads and pathways"/>
                        </div>
                     </Form.Field>
                </Form.Group>
            </Form> 
);

export default MainFormMid;
