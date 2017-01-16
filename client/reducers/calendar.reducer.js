import eventsList from '../data/eventsList';

const initialState = {
  events: indexEventsById(eventsList)
};

function calendarReducer (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
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

export default calendarReducer;
