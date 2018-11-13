import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 0,
    };
    this.checkoutCancelled = this.checkoutCancelled.bind(this);
    this.checkoutContinued = this.checkoutContinued.bind(this);
  }

  componentWillMount() {
    const { location } = this.props;
    const query = new URLSearchParams(location.search);
    const ingredients = {};
    let price = 0;
    [...query.entries()].map((param) => {
      if (param[0] === 'price') {
        const thePrice = param[1];
        price = thePrice;
      } else {
        ingredients[param[0]] = +param[1];
      }
      return true;
    });
    this.setState({ ingredients, totalPrice: price });
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
    const { ingredients, totalPrice } = this.state;
    const { match } = this.props;
    // console.log(price);
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
        />
        <Route
          path={`${match.path}/contact-data`}
          render={props => (
            <ContactData
              ingredients={ingredients}
              price={totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
