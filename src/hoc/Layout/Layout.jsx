import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false,
    }
    this.sideDrawerCloseHandler = this.sideDrawerCloseHandler.bind(this);
    this.sideDrawerToggleHandler = this.sideDrawerToggleHandler.bind(this);
  }
  
  sideDrawerCloseHandler() {
    this.setState({ showSideDrawer: false })
  }

  sideDrawerToggleHandler() {
    // const { showSideDrawer } = this.state;
    this.setState(prevState => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render() {
    const { children } = this.props;
    const { showSideDrawer } = this.state;
    return(
      <Aux>
          <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
          <SideDrawer
            open={showSideDrawer}
            closed={this.sideDrawerCloseHandler} />
        <main className={classes.Content}>
          {children}
        </main>
      </Aux>
    )
}
};

export default Layout;
