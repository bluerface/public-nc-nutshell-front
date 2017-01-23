import axios from 'axios';
import config from '../../config';
import types from '../types';

const actions = {};
export default actions;

actions.fetchResources = () => {
  return (dispatch) => {
    dispatch(actions.fetchResourcesRequest());
    return axios
      .get(config.SERVER + '/api/resources')
      .then(res => {
        dispatch(actions.fetchResourcesSuccess(res.data.resources))
      })
      .catch(err => {
        dispatch(actions.fetchResourcesError(err));
      })
  }
}

actions.fetchResourcesRequest = () =>
  ({type: types.FETCH_RESOURCES_REQUEST});

actions.fetchResourcesSuccess = (resources) =>
  ({type: types.FETCH_RESOURCES_SUCCESS, resources});

actions.fetchResourcesError = (error) =>
  ({type: types.FETCH_RESOURCES_ERROR, error});
