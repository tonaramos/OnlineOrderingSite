import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../hoc/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
      ingredients: null,
      totalPrice: 4,
      purchaseable: false,
      purchasing: false,
      loading: false,
      error: false,
    };
    this.addIngredientHandler = this.addIngredientHandler.bind(this);
    this.removeIngredientHandler = this.removeIngredientHandler.bind(this);
    this.updatePurchaseable = this.updatePurchaseable.bind(this);
    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
    this.purchaseContinuedHandler = this.purchaseContinuedHandler.bind(this);
  }

  componentDidMount() {
    console.log('this.props from componentDidMount in Builder ==>', this.props);
    axios.get('https://onlineorderingsite.firebaseio.com/ingredients.json')
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
    console.log('at update purchasable handler', this.state);
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinuedHandler() {
    const { history } = this.props;
    const { ingredients } = this.state;
    // in a real site the total price would be recalculated on the server.
    /*
    this.setState({ loading: true });
    const { ingredients, totalPrice } = this.state;
    const order = {
      ingredients,
      price: totalPrice,
      customer: {
        name: 'Tona',
        address: {
          street: '100 Test St',
          state: 'California',
          zipCode: '10101',
          country: 'United States',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };
    axios.post('/orders.json', order)
      .then((response) => {
        console.log(response);
        this.setState({
          loading: false,
          purchasing: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
          purchasing: false,
        });
      });
    */
    console.log(this.props);
    const queryParams = [];
    // const ingredientKeys = Object.keys(ingredients);
    Object.keys(ingredients).forEach((i) => {
      // if (ingredientKeys.length > 0) {
      queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(ingredients[i])}`);
    });
    console.log('queryParams in Builder for continue order window ->>', queryParams);
    const queryString = queryParams.join('&');
    history.push({
      pathname: '/checkout',
      search: `?${queryString}`,
    });
    // console.log('queryParams in Builder for continue order window ->>', queryParams);
    // console.log('queryString for continue order window ->>', queryString);
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
      loading,
      error,
    } = this.state;

    const disabledInfo = {
      ...ingredients,
    };

    Object.keys(disabledInfo).map((key) => {
      disabledInfo[key] = disabledInfo[key] <= 0;
      return null;
    });

    let burger = error ? <p>{'Ingredients can\'t be shown!'}</p> : <Spinner />;
    let orderSummary = null;

    if (ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            totalPrice={totalPrice}
            purchaseable={purchaseable}
            ordered={this.purchaseHandler}
          />
        </Aux>);

      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinuedHandler}
          totalPrice={totalPrice}
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

export default withErrorHandler(Builder, axios);
