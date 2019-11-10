import React from 'react';
import ReactDOM from 'react-dom'

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  };

  componentDidMount() {
    modalRoot.appendChild(this.el);
  };

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  };

  render() {
    return ReactDOM.createPortal(
      <div className={`ui dimmer modals visibile ${this.props.active === true ? "active" : ""}`}>
        <div className={`ui standard modal visible ${this.props.active === true ? "active" : ""}`}>
          <div className={`ui inverted dimmer ${this.props.active === true ? "active" : ""}`}>
            <div className="ui big text loader">{this.props.text}</div>
          </div>
        </div>
      </div>,
      this.el
    );
  }
}

export default Modal;