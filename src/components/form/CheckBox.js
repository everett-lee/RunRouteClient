import React from 'react';

const OptionsCheckBox = ({ arg, label, onInputChange }) => {
    return (
        <div className="ui checkbox">
            <input type="checkbox" onClick={() =>
                onInputChange(arg)}></input>
            <label>{label}</label>
        </div>
    );
};

export default OptionsCheckBox;
