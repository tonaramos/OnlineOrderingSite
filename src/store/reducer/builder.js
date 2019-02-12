import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  console.log('STATE in builder reducer-> ', state);
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      console.log('ACTION in builder-reducer-> ', action);

      // return {
      //   ...state,
      //   ingredients: {
      //     ...state.ingredients,
      //     [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      //   },
      //   totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      // };

      // ----- to make the code leaner in the switch we can do the following for all cases:
      // eslint-disable-next-line no-case-declarations
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      // eslint-disable-next-line no-case-declarations
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      // eslint-disable-next-line no-case-declarations
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
      return updateObject(
        state,
        updatedState,
      );
    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
