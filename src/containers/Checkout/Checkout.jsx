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
    this.checkoutCancelled = this.checkoutCancelled.bind(this);
    this.checkoutContinued = this.checkoutContinued.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    console.log(new URLSearchParams(location.search));
    const query = new URLSearchParams(location.search);
    console.log('they new URLSearch..->', query.entries());
    const ingredients = {};
    query.entries().map((param) => {
      ingredients[param[0]] = +param[1];
      return true;
    });
    // this.setState({ ingredients });
  }

  checkoutCancelled() {
    const { history } = this.props;
    history.goBack();
  }

  checkoutContinued() {
    const { history } = this.props;
    history.replace('/checkout/contact-data');
  }

  render() {
    const { ingredients } = this.state;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
        />
      </div>
    );
  }
}

export default Checkout;
