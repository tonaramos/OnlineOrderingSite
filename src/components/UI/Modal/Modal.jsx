import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
  const { show, children } = props;
  return (
    <Aux>
      <Backdrop show={show}>
        <div
          className={classes.Modal}
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100hv)',
            opacity: show ? '1' : '0',
          }}
        >
          {children}
        </div>
      </Backdrop>
    </Aux>
  );
};

modal.propTypes = {
  show: PropTypes.bool.isRequired,
  // children: PropTypes.objectOfType(,
};

export default modal;
