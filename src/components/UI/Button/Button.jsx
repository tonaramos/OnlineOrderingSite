import React from 'react';
import classes from './Button.css';

const button = (props) => {
  const { children, clicked, btnType } = props;
  return(
    <button className={[ classes.Button, classes[btnType]].join(' ')} onClick={clicked}>
      {children}
    </button>
  )
}

export default button;