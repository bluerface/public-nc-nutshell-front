import {expect} from 'chai';
import eventsReducer, {indexEventsById, getEventArray} from '../client/reducers/events.reducer.js';
import calendarReducer from '../client/reducers/calendar.reducer.js';
import deepFreeze from 'deep-freeze';
import actions from '../client/actions';

let events = [
  {
    _id: 123,
    start_date: "2017-01-26T10:30:00.000Z",
    title: 'test1'
  },
  {
    _id: 456,
    start_date: "2017-01-26T10:30:00.000Z",
    title: 'test2'
  }
];

describe('events reducer:', function () {
  describe('indexEventsById helper function', function () {
    it('to return an object containing the original events indexed by id', function () {
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
        123: {_id: 123, title: 'test1'},
        456: {_id: 456, title: 'test2'}
      }
      let state = {
        byId: events
      }
      let result = [events[123], events[456]];
      expect(getEventArray(state)).to.eql(result);
    });
  });

  describe('FETCH_EVENTS_REQUEST', function () {
    it('should set loading to true and reset errors', function () {
      var state = {
        loading: false,
        error: 'ghgkhgkjhgkdfdfg'
      };
      deepFreeze(state);

      var newState = eventsReducer(state, actions.fetchEventsRequest());
      expect(newState.error).to.equal(null);
      expect(newState.loading).to.be.true;
    });
  });

  describe('FETCH_EVENTS_SUCCESS', function () {
    it('should reset the loading property and add the provided events to the byID object', function () {
      var state = eventsReducer(undefined, actions.fetchEventsRequest());
      deepFreeze(state);

      let result = {
        123 : events[0],
        456: events[1]
      }

      var newState = eventsReducer(state, actions.fetchEventsSuccess(events));
      expect(newState.byId).to.eql(result);
      expect(newState.loading).to.be.false;
    });
    it('should change the date strings to date objects', function () {
      var newState = eventsReducer(undefined, actions.fetchEventsSuccess(events));
      expect(newState.byId[123].start_date).to.be.an.instanceOf(Date);
    });
  });

  describe('FETCH_EVENTS_ERROR', function () {
    it('should reset the loading property and set the error', function () {
      var state = eventsReducer(undefined, actions.fetchEventsRequest());
      deepFreeze(state);
      var err = 'hello I am an error'

      var newState = eventsReducer(state, actions.fetchEventsError(err));
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(err);
    });
  });

  describe('FETCH_EVENT_DETAIL_REQUEST', function () {
    it('resets any errors and sets loading to true', function () {
      var state = {loading: false, error: 'adfkajdflk'};
      var newState = eventsReducer(state, actions.fetchEventDetailRequest())
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
    });
  });

  describe('FETCH_EVENT_DETAIL_SUCCESS', function () {
    it('should update the event in the byId object with the additional data and set the isFull property to true', function () {
      var state = eventsReducer(undefined, actions.fetchEventsSuccess(events));
      deepFreeze(state);

      let event = {
        _id: 123,
        newprop: 'Im a new prop',
        start_date: "2017-01-26T10:30:00.000Z"
      }
      var newState = eventsReducer(state, actions.fetchEventDetailSuccess(event))
      expect(newState.byId[123].newprop).to.equal(event.newprop);
      expect(newState.byId[123].start_date).to.be.an.instanceOf(Date);
      expect(newState.byId[123].title).to.equal(events[0].title);
      expect(newState.byId[123].isFull).to.be.true;
    });
  });

  describe('FETCH_EVENT_DETAIL_ERROR', function () {
    it('should reset the loading property and set the error', function () {
      var state = eventsReducer(undefined, actions.fetchEventDetailRequest());
      var newState = eventsReducer(state, actions.fetchEventDetailError('Hello'))
      expect(newState.loading).to.be.false;
      expect(newState.error).to.equal('Hello');
    });
  });

  describe('POST_EVENT_REQUEST', function () {
    it('should add loading and remove any errors (from the calendar reducer)', function () {
      var state = {eventForm: {loading: false, error: 'asdfasdfasdf'}};
      deepFreeze(state);
      var newState = calendarReducer(state, actions.postEventRequest());
      expect(newState.eventForm.loading).to.be.true;
      expect(newState.eventForm.error).to.be.null;
    });
  });

  describe('POST_EVENT_SUCCESS', function () {
    it('should reset the loading property (calendar reducer)', function () {
      var state = calendarReducer(undefined, actions.postEventRequest());
      deepFreeze(state);
      var newState = calendarReducer(state, actions.postEventSuccess({_id: 123}));
      expect(newState.eventForm.loading).to.be.false;
    });
    it('should add the new event to the events byId object', function () {
      var state = eventsReducer(undefined, {});
      deepFreeze(state);
      var event = {
        _id: 123,
        title: 'hello'
      }
      var newState = eventsReducer(state, actions.postEventSuccess(event));
      expect(newState.byId[123]).to.eql(event);
    });
    it('should defocus the form, and focus the new event (calendar reducer)', function () {
      var state = {
        focusedEvent: null,
        eventForm: {
          focused: true,
          loading: true,
          error: null
        }
      }

      var event = {_id: 123}

      deepFreeze(state);
      var newState = calendarReducer(state, actions.postEventSuccess(event));
      expect(newState.eventForm.focused).to.be.false;
      expect(newState.focusedEvent).to.equal(123);
    });
  });

  describe('POST_EVENT_ERROR', function () {
    it('resets the loading property and sets the error (calendar reducer)', function () {
      var state = calendarReducer(undefined, actions.postEventRequest());
      deepFreeze(state);
      var newState = calendarReducer(state, actions.postEventError('I am an error'));
      expect(newState.eventForm.loading).to.be.false;
      expect(newState.eventForm.error).to.equal('I am an error');
    });
  });
});
