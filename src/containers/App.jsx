import React, { Component } from 'react';
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
          <Builder />
          <Checkout />
        </div>
      </Layout>
    );
  }
}

export default App;
