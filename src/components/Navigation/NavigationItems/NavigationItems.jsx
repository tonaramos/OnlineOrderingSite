/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/Orders">
      Orders
      </NavigationItem>
    )
      : null
    }
    { !props.isAuthenticated ? (
      <NavigationItem link="/auth">
      Authenticate
      </NavigationItem>
    )
      : (
        <NavigationItem link="/logOut">
    Logout
        </NavigationItem>
      ) }
  </ul>
);

export default navigationItems;
