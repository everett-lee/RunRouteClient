import React from 'react';
import { Form } from 'semantic-ui-react';
import CheckBox from './CheckBox';

// the middle part of the main input form
const MainFormMid = ({ onAvoidedFeaturesButtonInputChange, onPreferredFeaturesButtonInputChange }) =>
    (
        <Form>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Features to avoid</label>
                    <div>
                        <CheckBox onInputChange={onAvoidedFeaturesButtonInputChange}
                            arg="majorRoads" label="Major roads" />
                    </div>
                    <div>
                        <CheckBox onInputChange={onAvoidedFeaturesButtonInputChange}
                            arg="steps" label="Steps" />
                    </div>
                    <div>
                        <CheckBox onInputChange={onAvoidedFeaturesButtonInputChange}
                            arg="concrete" label="Concrete" />
                    </div>
                    <div>
                        <CheckBox onInputChange={onAvoidedFeaturesButtonInputChange}
                            arg="unlit" label="Unlit streets" />
                    </div>
                </Form.Field>
                <Form.Field>
                    <label>Preferred features</label>
                    <div>
                        <CheckBox onInputChange={onPreferredFeaturesButtonInputChange}
                            arg="uphill" label="Prefer uphill" />
                    </div>
                    <div>
                        <CheckBox onInputChange={onPreferredFeaturesButtonInputChange}
                            arg="residential" label="Residential streets" />
                    </div>
                    <div>
                        <CheckBox onInputChange={onPreferredFeaturesButtonInputChange}
                            arg="grassOrDirt" label="Unpaved sufaces" />
                    </div>
                    <div>
                        <CheckBox onInputChange={onPreferredFeaturesButtonInputChange}
                            arg="backroads" label="Backroads and pathways" />
                    </div>
                </Form.Field>
            </Form.Group>
        </Form>
    );

export default MainFormMid;
