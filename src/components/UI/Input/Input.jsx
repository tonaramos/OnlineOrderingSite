import React from 'react';
import classes from './Input.css';

const input = (props) => {
  let inputElement = null;

  switch (props.inputtype) {
    case ('input'):
      inputElement = <input id="inputForm" className={classes.InputElement} {...props} />;
      break;
    case ('textArea'):
      inputElement = <textarea id="inputForm" className={classes.InputElement} {...props} />;
      break;
    default:
      inputElement = <input id="inputForm" className={classes.InputElement} {...props} />;
  }
  const { label } = props;
  return (
    <div className={classes.Input}>
      <label id="infoFormLabel" htmlFor="inputForm" className={classes.Label}>
        {label}
      </label>
      {inputElement}
    </div>
  );
};

export default input;
