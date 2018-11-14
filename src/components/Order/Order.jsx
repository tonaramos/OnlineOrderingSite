import React from 'react';

import classes from './Order.css';

const order = (props) => {
  const { price, ingredients } = props;
  // console.log(key);
  const listOfIngredients = [];
  Object.keys(ingredients).map((item) => {
    listOfIngredients.push({
      name: item,
      amount: ingredients[item],
    });
    return true;
  });

  const ingredientOutput = listOfIngredients.map(ig => (
    <span
      key={ig.name}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px',
      }}
    >
      {ig.name}
      {' '}
    (
      {ig.amount}
    )
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>
        {ingredientOutput}
      </p>
      <p>
        {'Price:'}
        <strong>
          {`USD ${Number.parseFloat(price).toFixed(2)}`}
        </strong>
      </p>
    </div>
  );
};

export default order;
