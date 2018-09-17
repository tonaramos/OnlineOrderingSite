import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.css';

const backdrop = (props) => {
  const { show } = props;
  return show ? <div className={classes.backdrop} /> : null;
};

backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default backdrop;
