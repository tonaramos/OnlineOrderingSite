import React from 'react';
import classes from './Button.css';

const button = (props) => {
  const {
    children,
    clicked,
    btnType,
    disabled,
  } = props;
  return (
    <button disabled={disabled} type="button" className={[classes.Button, classes[btnType]].join(' ')} onClick={clicked}>
      {children}
    </button>
  );
};

export default button;
