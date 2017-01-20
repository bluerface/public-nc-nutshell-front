import {expect} from 'chai';
import deepFreeze from 'deep-freeze';
import calendarReducer, {getEventArray, indexEventsById} from '../client/reducers/calendar.reducer.js';
import * as actions from '../client/actions/calendar.actions.js';
import * as types from '../client/types/calendar.types.js';

describe('calendar reducer:', function () {
  describe('indexEventsById selector', function () {
    it('to return an object containing the original events indexed by id', function () {
      let events = [{id: 123, title: 'test1'}, {id: 456, title: 'test2'}]
      let result = {
        123 : events[0],
        456: events[1]
      }
      expect(indexEventsById(events)).to.eql(result);
    });
  });
  describe('getEventArray selector', function () {
    it('to return an array of the events', function () {
      let events = {
        123: {id: 123, title: 'test1'},
        456: {id: 456, title: 'test2'}
      }
      let state = {
        events
      }
      let result = [events[123], events[456]];
      expect(getEventArray(state)).to.eql(result);
    });
  });

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
      const state  = calendarReducer(undefined, actions.focusEventView(123));
      deepFreeze(state);
      let newState = calendarReducer(state, actions.defocusEventView());
      expect(newState.focusedEvent).to.be.null;
    });
  });
});