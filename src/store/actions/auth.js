import axios from 'axios';
import * as actionTypes from './actionTypes';

require('dotenv').config();

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
  console.log('the key!!', process.env.REACT_APP_FIREBASE_KEY);
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  console.log(authData);
  axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.REACT_APP_FIREBASE_KEY}`, authData)
    .then((response) => {
      console.log('THE RESPONSE from post req.->', response);
      dispatch(authSuccess(response.data));
    })
    .catch((err) => {
      console.log('THE ERROR at auth post request ->', err);
      dispatch(authFail(err));
    });
};
