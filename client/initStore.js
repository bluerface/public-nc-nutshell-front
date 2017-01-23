import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import actions from './actions/auth.actions.js';

import reducer from './reducers';

function initStore () {
  let store = createStore(reducer, applyMiddleware(thunk, createLogger()));

  let user = localStorage.getItem('user');
  if (user) {
    store.dispatch(actions.setUser(JSON.parse(user)))
  }

  return store;
}

export default initStore;
