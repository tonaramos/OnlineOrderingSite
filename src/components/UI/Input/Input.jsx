import React from 'react';
import classes from './Input.css';

const input = (props) => {
  const {
    invalid, shouldValidate, touched, valueType,
  } = props;
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
  }

  let validationError = null;
  if (invalid && touched) {
    validationError = (
      <p className={classes.ValidationError}>
      Please enter a valid
        {' '}
        {valueType}
        !
      </p>
    );
  }

  switch (props.inputType) {
    case ('input'):
      inputElement = (
        <input
          id="inputForm"
          className={inputClasses.join(' ')}
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
    case ('inputAuthEmail'):
      inputElement = (
        <input
          id="inputAuthEmail"
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case ('inputAuthPassword'):
      inputElement = (
        <input
          id="inputAuthPassword"
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          id="inputDefaultForm"
          className={inputClasses}
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
      {validationError}
    </div>
  );
};

export default input;
