import eventsList from '../data/eventsList';
import * as types from '../types/calendar.types.js';

const initialState = {
  events: indexEventsById(eventsList),
  focusedEvent: null
};

export default function calendarReducer (state = initialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case types.FOCUS_EVENT_VIEW:
      newState.focusedEvent = action.eventId;
      break;
    case types.DEFOCUS_EVENT_VIEW:
      newState.focusedEvent = null;
      break;
    default:
      return state;
  }
  return newState;
}

export function indexEventsById (eventsArr) {
  return eventsArr.reduce((acc, ele) => {
    acc[ele.id] = ele;
    return acc;
  }, {});
}

export function getEventArray (state) {
  let events = state.events;
  return Object.keys(events).reduce((acc, key) => {
    return acc.concat([events[key]]);
  }, [])
}
