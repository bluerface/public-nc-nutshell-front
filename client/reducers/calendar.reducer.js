import types from '../types';

const initialState = {
  focusedEvent: null,
  eventForm: {
    focused: false,
    loading: false,
    error: null
  },
  eventResourceForm: {
    loading: false,
    error: null
  }
};

export default function calendarReducer (state = initialState, action) {
  let newState = Object.assign(
    {},
    state
  );

  switch (action.type) {
    case types.FOCUS_EVENT_VIEW:
      newState.focusedEvent = action.eventId;
      break;

    case types.DEFOCUS_EVENT_VIEW:
      newState.focusedEvent = null;
      break;

    case types.FOCUS_EVENT_FORM:
      newState.eventForm = Object.assign({}, state.eventForm);
      newState.eventForm.focused = true;
      break;

    case types.DEFOCUS_EVENT_FORM:
      newState.eventForm = Object.assign({}, state.eventForm);
      newState.eventForm.focused = false;
      break;

    case types.POST_EVENT_REQUEST:
      newState.eventForm = Object.assign({}, state.eventForm);
      newState.eventForm.error = null;
      newState.eventForm.loading = true;
      break;

    case types.POST_EVENT_SUCCESS:
      newState.eventForm = Object.assign({}, state.eventForm);
      newState.eventForm.loading = false;
      newState.eventForm.focused = false;
      newState.focusedEvent = action.event._id;
      break;

    case types.POST_EVENT_ERROR:
      newState.eventForm = Object.assign({}, state.eventForm);
      newState.eventForm.loading = false;
      newState.eventForm.error = action.error;
      break;

    case types.ADD_EVENT_RESOURCE_REQUEST:
      newState.eventResourceForm = Object.assign({}, state.eventResourceForm);
      newState.eventResourceForm.loading = true;
      newState.eventResourceForm.error = null;
      break;

    case types.ADD_EVENT_RESOURCE_SUCCESS:
      newState.eventResourceForm = Object.assign({}, state.eventResourceForm);
      newState.eventResourceForm.loading = false;
      break;

    case types.ADD_EVENT_RESOURCE_ERROR:
      newState.eventResourceForm = Object.assign({}, state.eventResourceForm);
      newState.eventResourceForm.loading = false;
      newState.eventResourceForm.error = action.error;
      break;

    default:
      return state;
  }

  return newState;
}
