import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = name => ({
  type: actionTypes.ADD_INGREDIENTS,
  ingredientName: name,
});

export const removeIngredient = name => ({
  type: actionTypes.REMOVE_INGREDIENTS,
  ingredientName: name,
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});

export const fetchIngredientsFailed = () => ({ type: actionTypes.FETCH_INGREDIENTS_FAILED });

// return a func recieving a dispartch function  THiS will be async code.
export const initIngredients = () => ((dispatch) => {
  axios.get('https://onlineorderingsite.firebaseio.com/ingredients.json')
    .then((response) => {
      dispatch(setIngredients(response.data));
    })
    .catch((error) => {
      // Doing anything with this error?
      dispatch(fetchIngredientsFailed(error));
    });
});
