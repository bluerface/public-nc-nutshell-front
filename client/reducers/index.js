import {combineReducers} from 'redux';

import calendar from './calendar.reducer.js';
import auth from './auth.reducer.js';
import resourceView, * as fromResView from './resourceView.reducer.js';
import events, * as fromEvents from './events.reducer.js';
import resources, * as fromRes from './resources.reducer.js';

const reducer = combineReducers({
  auth,
  calendar,
  events,
  resourceView,
  resources
});

export default reducer

export const getEventArray = (state) =>
  fromEvents.getEventArray(state.events);

export const getEventById = (state, id) =>
  fromEvents.getEventById(state.events, id);

export const getTopicSlugs = (state) =>
  fromResView.getTopicSlugs (state.resourceView);

export const getTypeSlugs = (state) =>
  fromResView.getTypeSlugs (state.resourceView);

export const getResourceArray = (state) =>
  fromRes.getResourceArray(state.resources);
