import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
  const {
    ingredientAdded, ingredientRemoved, disabled, totalPrice, purchaseable, ordered,
  } = props;
  return (
    <div className={classes.BuildControls}>
      <p>
        {'Current price: '}
        <strong>
          {totalPrice.toFixed(2)}
        </strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => ingredientAdded(ctrl.type)}
          removed={() => ingredientRemoved(ctrl.type)}
          disabled={disabled[ctrl.type]}
        />
      ))}
      <button
        type="button"
        className={classes.OrderButton}
        onClick={ordered}
        disabled={!purchaseable}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;

buildControls.propTypes = {
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  disabled: PropTypes.objectOf(PropTypes.bool),
  totalPrice: PropTypes.number.isRequired,
  purchaseable: PropTypes.bool.isRequired,
  ordered: PropTypes.func.isRequired,
};
