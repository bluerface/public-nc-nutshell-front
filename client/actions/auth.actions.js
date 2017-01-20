import * as types from '../types/auth.types.js';
import axios from 'axios';
import config from '../../config';
import {browserHistory} from 'react-router';

let actions = {};

actions.signIn = (username, name, password) => {
  return (dispatch) => {
    dispatch(actions.signInRequest());
    return axios
      .post(config.SERVER + '/signin', {username, name, password})
      .then((res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        dispatch(actions.signInSuccess(res.data.user));
        browserHistory.push('/');
      }))
      .catch(err => {
        dispatch(actions.signInError(err));
      })
  }
}

actions.signInRequest = () => ({type: types.SIGNIN_REQUEST});

actions.signInError = (err) => ({type: types.SIGNIN_ERROR, err});

actions.signInSuccess = (user) => ({type: types.SIGNIN_SUCCESS, user});

actions.setUser = (user) => ({
  type: types.SET_USER,
  user
});

actions.signOut = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return {type: types.SIGNOUT};
}

export default actions;
