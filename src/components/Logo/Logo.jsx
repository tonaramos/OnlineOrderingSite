import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
      <img className={classes.Logo} src={burgerLogo} alt='MyBurger'  />
    </div>
);

export default logo;
