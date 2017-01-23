import axios from 'axios';
import config from '../../config'
import types from '../types';

var actions = {};

actions.addFilter = (tag) => ({
  type: types.ADD_FILTER,
  tag
})

actions.removeFilter = (tag) => ({
  type: types.REMOVE_FILTER,
  tag
});

actions.fetchTags = () => {
  return (dispatch) => {
    dispatch(actions.fetchTagsRequest());
    return axios
      .get(config.SERVER + '/api/tags')
      .then(res => {
        dispatch(actions.fetchTagsSuccess(res.data))
      })
      .catch(err => {
        dispatch(actions.fetchTagsError(err))
      })
  }
}

actions.fetchTagsRequest = () =>
  ({type: types.FETCH_TAGS_REQUEST})

actions.fetchTagsSuccess = (tags) =>
  ({type: types.FETCH_TAGS_SUCCESS, tags})

actions.fetchTagsError = (error) =>
  ({type: types.FETCH_TAGS_ERROR, error})

export default actions;
