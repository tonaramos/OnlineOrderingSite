import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const {
    ingredients,
    purchaseCancelled,
    purchaseContinued,
    totalPrice,
  } = props;
  const ingredientSummary = Object.keys(ingredients)
    .map(igKey => (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>
          {igKey}
        </span>
        {`: ${ingredients[igKey]}`}
      </li>
    ));
  return (
    <Aux>
      <h3>
        Your Order Summary
      </h3>
      <p>
        A delicious Burger with the following ingredients:
      </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>
        <strong>
          {`Total: price ${totalPrice.toFixed(2)}`}
        </strong>
      </p>
      <p>
        Continue to checkout?
      </p>
      <Button btnType="Danger" clicked={purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
