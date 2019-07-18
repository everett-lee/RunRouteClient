import React from 'react';
import ReactDOM from 'react-dom'
     
const Modal = props => {

    return ReactDOM.createPortal (
        <div className={`ui dimmer modals visibile ${props.active === true? "active": ""}`}>
        <div className={`ui standard modal visible ${props.active === true? "active": ""}`}>
            <div className={`ui inverted dimmer ${props.active === true? "active": ""}`}>
                 <div className="ui big text loader">Generating route</div>
            </div>
        </div>,
        </div>,
        document.querySelector('#modal')
    );
}; 

export default Modal;