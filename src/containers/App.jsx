import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Layout from '../hoc/Layout/Layout';
import Builder from './Builder/Builder';
import Checkout from './Checkout/Checkout';
import Orders from './Orders/Orders';
import Auth from './Auth/Auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <div className="pageContents">
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/" exact component={Builder} />
          </Switch>
        </div>
      </Layout>
    );
  }
}

export default App;
