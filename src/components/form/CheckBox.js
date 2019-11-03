import React from 'react';

const OptionsCheckBox = (props) =>
    {
        return (
           <div className="ui checkbox">
            <input type="checkbox" onClick={() => 
                props.onInputChange(props.arg)}></input>
            <label>{props.label}</label>
           </div>
        );
    };

export default OptionsCheckBox;
