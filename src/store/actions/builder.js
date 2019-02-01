import * as actionTypes from './actionTypes';

export const addIngredient = name => ({
  type: actionTypes.ADD_INGREDIENTS,
  ingredientName: name,
});

export const removeIngredient = name => ({
  type: actionTypes.REMOVE_INGREDIENTS,
  ingredientName: name,
});
