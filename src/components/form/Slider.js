import React from 'react';

const Slider = (props) => {
    return (
    <div className="slidecontainer">
    <input type="range" onChange={event => props.onSliderInputChange(event)} 
    min={0} max={30} defaultValue={15} className="slider" id="myRange" />
    </div>
    );
};

export default Slider;