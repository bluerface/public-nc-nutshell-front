import types from '../types';

var initialState = {
  byId: {},
  error: null,
  loading: false
}

export default function (state = initialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case types.FETCH_RESOURCES_REQUEST:
      newState.loading = true;
      newState.error = null;
      break;

    case types.FETCH_RESOURCES_SUCCESS:
      newState.byId = indexResourcesById(action.resources);
      newState.loading = false;
      break;

    case types.FETCH_RESOURCES_ERROR:
      newState.loading = false;
      newState.error = action.error;
      break;

    default:
      return state
  }
  return newState;
}

export function indexResourcesById (eventsArr) {
  return eventsArr.reduce((acc, ele) => {
    acc[ele._id] = ele;
    return acc;
  }, {});
}

export function getResourceArray (state) {
  let resources = state.byId;
  return Object.keys(resources).reduce((acc, key) => {
    return acc.concat([resources[key]]);
  }, [])
}
