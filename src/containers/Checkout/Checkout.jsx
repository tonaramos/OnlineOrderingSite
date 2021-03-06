import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
    const { ings, match, purchased } = this.props;
    let summary = <Redirect to="/" />;
    if (ings) {
      const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
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
    return summary;
  }
}

const mapStateToProps = state => ({
  ings: state.builder.ingredients,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);
