import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const auth = (email, password) => (dispatch) => {
  dispatch(authStart());
  axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]')
};
