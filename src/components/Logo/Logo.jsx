import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => {
  const { height } = props;
  return (
    <div className={classes.Logo} style={{ height }}>
      <img src={burgerLogo} alt="MyBurger" />
    </div>
  );
};

export default logo;
