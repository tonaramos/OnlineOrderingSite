import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
  const { show, children, modalClosed } = props;
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
      {console.log('showinModal->', show)}
        {children}
      </div>
    </Aux>
  );
};

modal.propTypes = {
  show: PropTypes.bool.isRequired,
  // children: PropTypes.objectOfType(,
};

export default modal;
