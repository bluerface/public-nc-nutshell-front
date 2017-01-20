import * as types from '../types/auth.types.js';

const initialState = {
  currentUser: null,
  isSigningIn: false,
  signInError: null
}

function authReducer (state = initialState, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case types.SIGNIN_REQUEST:
      newState.currentUser = null;
      newState.isSigningIn = true;
      newState.signInError = null;
      break;

    case types.SIGNIN_SUCCESS:
      newState.currentUser = action.user;
      newState.isSigningIn = false;
      break;

    case types.SIGNIN_ERROR:
      newState.signInError = action.err
      newState.isSigningIn = false;
      break;

    case types.SET_USER:
      newState.currentUser = action.user;
      break;

    case types.SIGNOUT:
      newState.currentUser = null;
      break;

    default:
      return state;
  }

  return newState;
}

export default authReducer;
