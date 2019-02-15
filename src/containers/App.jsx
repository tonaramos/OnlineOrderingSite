import React, { Component } from 'react';
import {
  Route,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from '../hoc/asyncComponent/asyncComponent';

import './App.css';

import Layout from '../hoc/Layout/Layout';
import Builder from './Builder/Builder';
import Logout from './Auth/Logout/Logout';
import * as actions from '../store/actions/index';

// The below components are now loaded only when needed.
const asyncCheckout = asyncComponent(() => import('./Checkout/Checkout'));

const asyncOrders = asyncComponent(() => import('./Orders/Orders'));

const asyncAuth = asyncComponent(() => import('./Auth/Auth'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onTryAutoSignup } = this.props;
    onTryAutoSignup();
  }

  render() {
    const { isAuthenticated } = this.props;

    let routes = (
      <Switch>
        <Route path="/auth" exact component={asyncAuth} />
        <Route path="/" exact component={Builder} />
        <Redirect to="/" />
      </Switch>
    );

    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" exact component={asyncOrders} />
          <Route path="/logOut" exact component={Logout} />
          <Route path="/auth" exact component={asyncAuth} />
          <Route path="/" exact component={Builder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        <div className="pageContents">
          {routes}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
