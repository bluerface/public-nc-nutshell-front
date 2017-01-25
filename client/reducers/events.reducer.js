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

    case types.POST_EVENT_SUCCESS:
    {
      newState.byId = Object.assign({}, state.byId);
      let event = action.event;
      event.start_date = new Date(event.start_date);
      event.end_date = new Date(event.end_date);
      newState.byId[action.event._id] = action.event;
      break;
    }

    default:
      return state;
  }

  return newState;
}

export function indexEventsById (eventsArr) {
  return eventsArr.reduce((acc, ele) => {
    ele.start_date = new Date(ele.start_date);
    ele.end_date = new Date(ele.end_date);
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
