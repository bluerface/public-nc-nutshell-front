import {expect} from 'chai';
import deepFreeze from 'deep-freeze';
import calendarReducer, {getEventArray, indexEventsById} from '../client/reducers/calendar.reducer.js';
import * as actions from '../client/actions/calendar.actions.js';
import * as types from '../client/types/calendar.types.js';

describe('indexEventsById', function () {
  let events = [{id: 123, title: 'test1'}, {id: 456, title: 'test2'}]
  it('to be a function', function () {
    expect(indexEventsById).to.be.a('function');
  });
  it('to return an object', function () {
    expect(indexEventsById(events)).to.be.an('object');
  });
  it('to contain the original events indexed by id', function () {
    let result = {
      123 : events[0],
      456: events[1]
    }
    expect(indexEventsById(events)).to.eql(result);
  });
});

describe('getEventArray', function () {
  let events = {
    123: {id: 123, title: 'test1'},
    456: {id: 456, title: 'test2'}
  }
  let state = {
    events
  }
  it('is a function', function () {
    expect(getEventArray).to.be.a('function');
  });
  it('to return an array', function () {
    expect(getEventArray(state)).to.be.an('array');
  });
  it('to return an array of the events', function () {
    let result = [events[123], events[456]];
    expect(getEventArray(state)).to.eql(result);
  });
});

describe('actions:', function () {
  it('focusEventView should return the correct action', function () {
    expect(actions.focusEventView(123)).to.eql({type: types.FOCUS_EVENT_VIEW, eventId: 123});
  });
  it('defocusEventView should return the correct action', function () {
    expect(actions.defocusEventView(123)).to.eql({type: types.DEFOCUS_EVENT_VIEW});
  });
});

describe('reducer:', function () {
  describe('focusEventView', function () {
    it('should set the focusedEvent property to the given eventId', function () {
      let state = calendarReducer(undefined, {});
      deepFreeze(state);
      let newState = calendarReducer(state, actions.focusEventView(123));
      expect(newState.focusedEvent).to.equal(123);
    });
  });
  describe('defocusEventView', function () {
    it('should set the focusedEvent property to null', function () {
      let state = calendarReducer(undefined, {});
      state  = calendarReducer(state, actions.focusEventView(123));
      deepFreeze(state);

      let newState = calendarReducer(state, actions.defocusEventView());
      expect(newState.focusedEvent).to.be.null;
    });
  });
});
