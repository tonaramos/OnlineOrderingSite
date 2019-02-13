/* eslint-disable no-undef */
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

export const logout = () => {
  // eslint-disable-next-line no-undef
  localStorage.removeItem('token');
  // eslint-disable-next-line no-undef
  localStorage.removeItem('expirationDate');
  // eslint-disable-next-line no-undef
  localStorage.removeItem('userId');
  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = expirationTime => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignup) => (dispatch) => {
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
  axios.post(url, authData)
    .then((response) => {
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      // eslint-disable-next-line no-undef
      localStorage.setItem('token', response.data.idToken);
      // eslint-disable-next-line no-undef
      localStorage.setItem('expirationDate', expirationDate);
      // eslint-disable-next-line no-undef
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((err) => {
      dispatch(authFail(err.response.data.error));
    });
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => (dispatch) => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-use-before-define
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      // eslint-disable-next-line no-undef
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId));
      dispatch(checkAuthTimeout(((expirationDate.getTime() - new Date().getTime()) / 1000)));
    }
  }
};
