import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import calendar from './reducers/calendar.reducer.js';
import auth from './reducers/auth.reducer.js';
import resources from './reducers/resources.reducer.js';
import actions from './actions/auth.actions.js';

function initStore () {
  let reducer = combineReducers({
    calendar,
    auth,
    resources
  })

  let store = createStore(reducer, applyMiddleware(thunk, createLogger()));

  let user = localStorage.getItem('user');
  if (user) {
    store.dispatch(actions.setUser(JSON.parse(user)))
  }

  return store;
}

export default initStore;
