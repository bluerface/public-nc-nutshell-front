import {expect} from 'chai';
import {getEventArray, indexEventsById} from '../client/reducers/calendar.reducer.js';

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
