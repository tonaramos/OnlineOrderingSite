import React, { Component } from 'react';
import './App.css';
import Layout from '../hoc/Layout/Layout';
import Builder from './Builder/Builder';

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
        </div>
      </Layout>
    );
  }
}

export default App;
