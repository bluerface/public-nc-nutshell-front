import * as types from '../types/calendar.types.js'

const actions = {}
export default actions;

actions.focusEventView = (eventId) => ({
    type: types.FOCUS_EVENT_VIEW,
    eventId
});

actions.defocusEventView = () => ({
  type: types.DEFOCUS_EVENT_VIEW
})

actions.focusEventForm = () => ({type: types.FOCUS_EVENT_FORM});

actions.defocusEventForm = () => ({type: types.DEFOCUS_EVENT_FORM});
