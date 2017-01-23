import axios from 'axios';
import config from '../../config';
import * as types from '../types/events.types.js';

const actions = {};

// ---------------- fetch events

actions.fetchEvents = () => {
  return (dispatch) => {
    dispatch(actions.fetchEventsRequest());
    return axios
      .get(config.SERVER + '/api/events')
      .then(res => {
        dispatch(actions.fetchEventsSuccess(res.data.events))
      })
      .catch(err => {
        dispatch(actions.fetchEventsError(err))
      })
  }
}

actions.fetchEventsRequest = () =>
  ({type: types.FETCH_EVENTS_REQUEST});

actions.fetchEventsSuccess = (events) =>
  ({type: types.FETCH_EVENTS_SUCCESS, events})

actions.fetchEventsError = (error) =>
  ({type: types.FETCH_EVENTS_ERROR, error})



// -------------- fetch event detail

actions.fetchEventDetail = (eventId) => {
  return (dispatch) => {
    dispatch(actions.fetchEventDetailRequest());
    return axios
      .get(config.SERVER + '/api/events/' + eventId)
      .then(res => {
        dispatch(actions.fetchEventDetailSuccess(res.data.event))
      })
      .catch(err => {
        dispatch(actions.fetchEventDetailError(err))
      })
  }
}

actions.fetchEventDetailRequest = () =>
  ({type: types.FETCH_EVENT_DETAIL_REQUEST})

actions.fetchEventDetailSuccess = (event) =>
  ({type: types.FETCH_EVENT_DETAIL_SUCCESS, event})

actions.fetchEventDetailError = (error) =>
  ({type: types.FETCH_EVENT_DETAIL_ERROR, error})


export default actions;
