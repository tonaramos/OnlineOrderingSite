import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {
  console.log('props from burger.jsx ==>', props);
  const { ingredients } = props;
  let transformedIngredients = Object.keys(ingredients)
    .map(igKey => [...Array(ingredients[igKey])]
      .map(() => <BurgerIngredient key={igKey} type={igKey} />))
    .reduce((arr, el) => arr.concat(el));

  if (transformedIngredients.length === 0) {
    transformedIngredients = (
      <p>
        Please start adding ingredients
      </p>
    );
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

// burger.propTypes = {
//   ingredients: any,
// };

export default withRouter(burger);
