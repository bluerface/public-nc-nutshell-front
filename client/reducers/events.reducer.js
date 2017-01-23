import moment from 'moment';
import * as types from '../types/events.types.js';

var initialState = {
  byId: {},
  loading: false,
  error: null
}

export default function eventsReducer (state = initialState, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case types.FETCH_EVENTS_REQUEST:
      newState.error = null;
      newState.loading = true;
      break;

    case types.FETCH_EVENTS_SUCCESS:
      newState.byId = indexEventsById(action.events);
      newState.loading = false;
      break;

    case types.FETCH_EVENTS_ERROR:
      newState.loading = false;
      newState.error = action.error
      break;

    case types.FETCH_EVENT_DETAIL_REQUEST:
      newState.loading = true;
      newState.error = null;
      break;

    case types.FETCH_EVENT_DETAIL_SUCCESS:
    {
      let id = action.event._id;
      newState.byId = Object.assign({}, state.byId);
      newState.byId[id] = Object.assign({}, action.event, state.byId[id], {isFull: true})
      break;
    }

    case types.FETCH_EVENT_DETAIL_ERROR:
      newState.loading = false;
      newState.error = action.error;
      break;

    default:
      return state;
  }

  return newState;
}

export function indexEventsById (eventsArr) {
  return eventsArr.reduce((acc, ele) => {
    ele.start_date = moment(ele.start_date).toDate();
    ele.end_date = moment(ele.end_date).toDate();
    ele.isFull = false;
    acc[ele._id] = ele;
    return acc;
  }, {});
}

export function getEventArray (state) {
  let events = state.byId;
  return Object.keys(events).reduce((acc, key) => {
    return acc.concat([events[key]]);
  }, [])
}

export function getEventById (state, id) {
  return state.byId[id];
}
