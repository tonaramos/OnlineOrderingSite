import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.css';

const backdrop = (props) => {
  const { show, clicked } = props;
  console.log('got to the backdrop,a dn this is the show->', show);
  return show ? <div className={classes.Backdrop} onClick={clicked} /> : null;
};

backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default backdrop;
