import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  token: null,
  error: null,
  loading: false,
};

const authStart = state => (updateObject(state, { error: null, loading: true }));

const authSuccess = (state, action) => (updateObject(state, {
  token: action.idToken,
  userId: action.userId,
  error: null,
  loading: false,
}));

const authFail = (state, action) => (updateObject(state, {
  error: action.error,
  loading: false,
}));

const authLogOut = state => (updateObject(state, { token: null, userId: null }));

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogOut(state, action);
    default:
      return state;
  }
};

export default reducer;
