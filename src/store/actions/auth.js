import axios from 'axios';
import * as actionTypes from './actionTypes';

require('dotenv').config();

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => ({ type: actionTypes.AUTH_LOGOUT });

export const checkAuthTimeout = expirationTime => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignup) => (dispatch) => {
  console.log('the key!!', process.env.REACT_APP_FIREBASE_KEY);
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.REACT_APP_FIREBASE_KEY}`;
  if (!isSignup) {
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
  }
  console.log(authData);
  axios.post(url, authData)
    .then((response) => {
      console.log('THE RESPONSE from post req.->', response);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((err) => {
      console.log('THE ERROR at auth post request ->', err.response.data.error);
      dispatch(authFail(err.response.data.error));
    });
};
