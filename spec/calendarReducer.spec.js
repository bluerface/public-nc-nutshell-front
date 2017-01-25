import {expect} from 'chai';
import deepFreeze from 'deep-freeze';
import calendarReducer from '../client/reducers/calendar.reducer.js';
import actions from '../client/actions/calendar.actions.js';
import * as types from '../client/types/calendar.types.js';

describe('calendar reducer:', function () {
  describe('FOCUS_EVENT_VIEW', function () {
    it('action creator should return the correct action', function () {
      expect(actions.focusEventView(123)).to.eql({type: types.FOCUS_EVENT_VIEW, eventId: 123});
    });
    it('should set the focusedEvent property to the given eventId', function () {
      let state = calendarReducer(undefined, {});
      deepFreeze(state);
      let newState = calendarReducer(state, actions.focusEventView(123));
      expect(newState.focusedEvent).to.equal(123);
    });
  });

  describe('DEFOCUS_EVENT_VIEW', function () {
    it('action creator should return the correct action', function () {
      expect(actions.defocusEventView(123)).to.eql({type: types.DEFOCUS_EVENT_VIEW});
    });
    it('should set the focusedEvent property to null', function () {
      let state = calendarReducer(undefined, {});
      state  = calendarReducer(state, actions.focusEventView(123));
      deepFreeze(state);

      let newState = calendarReducer(state, actions.defocusEventView());
      expect(newState.focusedEvent).to.be.null;
    });
  });

  describe('FOCUS_EVENT_FORM', function () {
    it('should set the eventFormFocused property to true', function () {
      let state = calendarReducer(undefined, {});
      deepFreeze(state);
      let newState = calendarReducer(state, actions.focusEventForm());
      expect(newState.eventForm.focused).to.be.true;
    });
  });

  describe('DEFOCUS_EVENT_FORM', function () {
    it('should set the eventFormFocused property to false', function () {
      let state = calendarReducer(undefined, {});
      state  = calendarReducer(state, actions.focusEventForm());
      deepFreeze(state);

      let newState = calendarReducer(state, actions.defocusEventForm());
      expect(newState.eventForm.focused).to.be.false;
    });
  });
});
