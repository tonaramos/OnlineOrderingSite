import React from 'react';
import classes from './NavigationItem.css';

const navigationItem = (props) => {
  const { children, link, active } = props;
  return(
    <li className={classes.NavigationItem}>
      <a 
        href={link}
        className={active ? classes.active : null}>
        {children}
      </a>
    </li>
  )
};

export default navigationItem;