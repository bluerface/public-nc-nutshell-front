import * as types from '../types/calendar.types.js';

const initialState = {
  focusedEvent: null,
  eventFormFocused: false
};

export default function calendarReducer (state = initialState, action) {
  let newState = Object.assign(
    {},
    state
    // {events: eventsReducer(state.events, action)}
  );

  switch (action.type) {
    case types.FOCUS_EVENT_VIEW:
      newState.focusedEvent = action.eventId;
      break;

    case types.DEFOCUS_EVENT_VIEW:
      newState.focusedEvent = null;
      break;

    case types.FOCUS_EVENT_FORM:
      newState.eventFormFocused = true;
      break;

    case types.DEFOCUS_EVENT_FORM:
      newState.eventFormFocused = false;
      break;

    default:
      return state;
  }

  return newState;
}
