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


// -------------- post event

actions.postEvent = (event) => {
  return (dispatch) => {
    dispatch(actions.postEventRequest());
    return axios
      .post(config.SERVER + '/api/events', event)
      .then(res => {
        dispatch(actions.postEventSuccess(res.data.event))
      })
      .catch(err => {
        dispatch(actions.postEventError(err))
      })
  }
}

actions.postEventRequest = () =>
  ({type: types.POST_EVENT_REQUEST})

actions.postEventSuccess = (event) =>
  ({type: types.POST_EVENT_SUCCESS, event})

actions.postEventError = (error) =>
  ({type: types.POST_EVENT_ERROR, error})

// ---------------- add event resource

actions.addEventResource = (eventId, body) => {
  return (dispatch) => {
    dispatch(actions.addEventResourceRequest());
    return axios
      .post(config.SERVER + `/api/events/${eventId}/resources`, body)
      .then(res => {
        dispatch(actions.addEventResourceSuccess(eventId, res.data))
      })
      .catch(err => {
        dispatch(actions.addEventResourceError(err))
      })
  }
}

actions.addEventResourceRequest = () =>
  ({type: types.ADD_EVENT_RESOURCE_REQUEST});

actions.addEventResourceSuccess = (eventId, payload) =>
  ({type: types.ADD_EVENT_RESOURCE_SUCCESS, eventId, payload})

actions.addEventResourceError = (error) =>
  ({type: types.ADD_EVENT_RESOURCE_ERROR, error})

export default actions;
