import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../hoc/axios-orders';

export class Builder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
    };
    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
    this.purchaseContinuedHandler = this.purchaseContinuedHandler.bind(this);
  }

  componentDidMount() {
    const { onInitIngredients } = this.props;
    onInitIngredients();
  }

  purchaseHandler() {
    const { isAuthenticated, history, onSetAuthRedirectPath } = this.props;
    if (isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      onSetAuthRedirectPath('/checkout');
      history.push('/auth');
    }
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinuedHandler() {
    const { history, onInitPurchase } = this.props; // ings
    history.push('/checkout');
    onInitPurchase();
  }

  // eslint-disable-next-line class-methods-use-this
  updatePurchaseable() {
    const { ings } = this.props;
    const totalItems = Object.keys(ings)
      .map(igKey => ings[igKey])
      .reduce((sum, el) => sum + el, 0);
    return totalItems > 0;
  }

  render() {
    const {
      purchasing,
      loading,
    } = this.state;

    const {
      error,
      ings,
      price,
      onIngredientAdded,
      onIngredientRemoved,
      isAuthenticated,
    } = this.props;

    const disabledInfo = {
      ...ings,
    };

    Object.keys(disabledInfo).map((key) => {
      disabledInfo[key] = disabledInfo[key] <= 0;
      return null;
    });

    let burger = error ? <p>{'Ingredients can\'t be shown!'}</p> : <Spinner />;
    let orderSummary = null;

    if (ings) {
      burger = (
        <Aux>
          <Burger ingredients={ings} />
          <BuildControls
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={disabledInfo}
            totalPrice={price}
            purchaseable={this.updatePurchaseable()}
            ordered={this.purchaseHandler}
            isAuth={isAuthenticated}
          />
        </Aux>);

      orderSummary = (
        <OrderSummary
          ingredients={ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinuedHandler}
          totalPrice={price}
        />
      );
    }

    if (loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}


const mapStateToProps = state => ({
  ings: state.builder.ingredients,
  price: state.builder.totalPrice,
  error: state.error,
  isAuthenticated: state.auth.token != null,
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
  onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Builder, axios));
