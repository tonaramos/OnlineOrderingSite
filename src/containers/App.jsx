import React, { Component } from 'react';
import {
  Route,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import Layout from '../hoc/Layout/Layout';
import Builder from './Builder/Builder';
import Checkout from './Checkout/Checkout';
import Orders from './Orders/Orders';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout/Logout';
import * as actions from '../store/actions/index';

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
        <Route path="/auth" exact component={Auth} />
        <Route path="/" exact component={Builder} />
        <Redirect to="/" />
      </Switch>
    );

    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/auth" exact component={Auth} />
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
