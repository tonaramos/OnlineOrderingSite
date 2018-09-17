import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControl.css';

const buildControl = (props) => {
  const { label, added, removed, disabled } = props;
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>
        {label}
      </div>
      <button type="button" className={classes.Less} onClick={removed} disabled={disabled}>
        Less
      </button>
      <button type="button" className={classes.More} onClick={added}>
        More
      </button>
    </div>
  );
};

buildControl.propTypes = {
  label: PropTypes.string.isRequired,
  added: PropTypes.func.isRequired,
  removed: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default buildControl;
