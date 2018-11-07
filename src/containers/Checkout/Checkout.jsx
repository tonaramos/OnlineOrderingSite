import React, { Component } from 'react';

// import Layout from './hoc/Layout/Layout';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
// import Checkout from './containers/Checkout/Checkout';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 1,
        Meat: 1,
        cheese: 1,
        bacon: 1,
      },
    };
  }

  render() {
    const { ingredients } = this.state;
    return (
      <div>
        <CheckoutSummary ingredients={ingredients} />
      </div>
    );
  }
}

export default Checkout;
