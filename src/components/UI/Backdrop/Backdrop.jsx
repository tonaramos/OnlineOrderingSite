import React from 'react';
// import PropTypes from 'prop-types';
import classes from './Backdrop.css';

const backdrop = (props) => {
  const { show, clicked } = props;
  return show ? <div className={classes.Backdrop} onClick={clicked} onKeyPress={clicked} role="presentation" /> : null;
};

// backdrop.propTypes = {
//   show: PropTypes.bool.isRequired,
// };

export default backdrop;
