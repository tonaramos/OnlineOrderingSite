import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../hoc/axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class Builder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      },
      totalPrice: 4,
      purchaseable: false,
      purchasing: false,
    };
    this.addIngredientHandler = this.addIngredientHandler.bind(this);
    this.removeIngredientHandler = this.removeIngredientHandler.bind(this);
    this.updatePurchaseable = this.updatePurchaseable.bind(this);
    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
    this.purchaseContinuedHandler = this.purchaseContinuedHandler.bind(this);
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
    console.log('at update purchasable handler', this.state)
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false})
  }

  purchaseContinuedHandler() {
    //in a real site the total price would be recalculated on the server.
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Tona',
        address: {
          street: '100 Test St',
          state: 'California',
          zipCode: '10101',
          country: 'United States'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  updatePurchaseable(ingredients) {
    const totalItems = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    this.setState({ purchaseable: totalItems > 0 });
  }

  addIngredientHandler(type) {
    const { ingredients, totalPrice } = this.state;
    const updatedCount = ingredients[type] + 1;
    const updatedIngredients = {
      ...ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = totalPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseable(updatedIngredients);
  }

  removeIngredientHandler(type) {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = ingredients[type] - 1;
    const updatedIngredients = {
      ...ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceSubtraction = INGREDIENT_PRICES[type];
    const newPrice = totalPrice - priceSubtraction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseable(updatedIngredients);
  }

  render() {
    const {
      ingredients,
      totalPrice,
      purchaseable,
      purchasing,
    } = this.state;

    const disabledInfo = {
      ...ingredients,
    };
    Object.keys(disabledInfo).map((key) => {
      disabledInfo[key] = disabledInfo[key] <= 0;
      return null;
    });
    console.log('purchasing state', purchasing)
    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
        
          <OrderSummary
            ingredients={ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinuedHandler}
            totalPrice={totalPrice} />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          totalPrice={totalPrice}
          purchaseable={purchaseable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default Builder;
