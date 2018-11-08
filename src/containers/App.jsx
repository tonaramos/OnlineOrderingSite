import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Layout from '../hoc/Layout/Layout';
import Builder from './Builder/Builder';
import Checkout from './Checkout/Checkout';

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
            <Route path="/" exact component={Builder} />
          </Switch>
        </div>
      </Layout>
    );
  }
}

export default App;
