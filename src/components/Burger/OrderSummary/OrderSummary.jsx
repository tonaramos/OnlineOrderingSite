import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const { ingredients, purchaseCancelled, purchaseContinued } = props;
  const ingredientSummary = Object.keys(ingredients)
    .map(igKey => (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>
          {igKey}
        </span>
        {`: ${ingredients[igKey]}`}
      </li>
    ));
    console.log()
  return (
    <Aux>
      <h3>
        Your Order
      </h3>
      <p>
        A delicious Burger with the following ingredients:
      </p>
      <ul>
        {ingredientSummary}
      </ul>
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

export default orderSummary;
