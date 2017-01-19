import * as types from '../types/calendar.types.js'

export const focusEventView = (eventId) => ({
    type: types.FOCUS_EVENT_VIEW,
    eventId
});

export const defocusEventView = () => ({
  type: types.DEFOCUS_EVENT_VIEW
})
