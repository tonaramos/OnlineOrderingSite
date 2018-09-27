import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  
  shouldComponentUpdate(nextProps, nextState ) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  // componentWillUpdate() {
  //  console.log('[Modal] willupdate') 
  // }

  render() {
  const { show, children, modalClosed } = this.props;
  return (
    <Aux>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
        {children}
      </div>
    </Aux>
  )};
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Modal;
