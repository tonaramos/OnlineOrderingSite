import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.checkoutCancelled = this.checkoutCancelled.bind(this);
    this.checkoutContinued = this.checkoutContinued.bind(this);
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
    const { ings, match } = this.props;
    return (
      <div>
        <CheckoutSummary
          ingredients={ings}
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
        />
        <Route
          path={`${match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.ingredients,
});

export default connect(mapStateToProps)(Checkout);
