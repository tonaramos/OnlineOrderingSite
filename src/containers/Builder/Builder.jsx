import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../hoc/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class Builder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // purchaseable: false,
      purchasing: false,
      loading: false,
      error: false,
    };
    // this.updatePurchaseable = this.updatePurchaseable.bind(this);
    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
    this.purchaseContinuedHandler = this.purchaseContinuedHandler.bind(this);
  }

  componentDidMount() {
    // console.log('this.props from componentDidMount in Builder ==>', this.props);
    // axios.get('https://onlineorderingsite.firebaseio.com/ingredients.json')
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(() => {
    //     this.setState({ error: true });
    //   });
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
    console.log('at update purchasable handler', this.state);
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinuedHandler() {
    const { ings, history } = this.props;
    console.log(ings);
    history.push('/checkout');
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
      error,
    } = this.state;

    const {
      ings,
      price,
      onIngredientAdded,
      onIngredientRemoved,
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
  ings: state.ingredients,
  price: state.totalPrice,
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName => dispatch({
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: ingName,
  }),
  onIngredientRemoved: ingName => dispatch({
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: ingName,
  }),
});


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Builder, axios));
