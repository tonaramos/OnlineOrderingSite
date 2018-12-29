import React from 'react';
import classes from './Input.css';

const input = (props) => {
  let inputElement = null;

  switch (props.inputtype) {
    case ('input'):
      inputElement = (
        <input
          id="inputForm"
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case ('textArea'):
      inputElement = (
        <textarea
          id="inputForm"
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case ('select'):
      inputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          id="inputForm"
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
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
