import React from 'react';

const drawerToggle = props => {
  const { clicked } = props;
  return(
    <div onClick={clicked}>
      Menu
    </div>
  )
};

export default drawerToggle;