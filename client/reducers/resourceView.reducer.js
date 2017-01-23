import types from '../types';

var initialState = {
  tags: {
    data: [],
    error: null,
    loading: false
  },
  currentFilters: []
}

export default function (state = initialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case types.ADD_FILTER:
      newState.currentFilters = state.currentFilters.concat([action.tag]);
      break;

    case types.REMOVE_FILTER:
      newState.currentFilters = state.currentFilters.filter((tag) => tag.id !== action.tag.id);
      break;

    case types.FETCH_TAGS_REQUEST:
      newState.tags = Object.assign({}, state.tags);
      newState.tags.loading = true;
      newState.tags.error = null;
      break;

    case types.FETCH_TAGS_SUCCESS:
      newState.tags = Object.assign({}, state.tags);
      newState.tags.loading = false;
      newState.tags.data = action.tags;
      break;

    case types.FETCH_TAGS_ERROR:
      newState.tags = Object.assign({}, state.tags);
      newState.tags.loading = false;
      newState.tags.error = action.error;
      break;

    default:
      return state;
  }

  return newState;
}

export function getTopicSlugs (state) {
  return state.currentFilters
    .filter((tag) => tag.category.toLowerCase() === 'topic')
    .map((tag) => tag.slug);
}

export function getTypeSlugs (state) {
  return state.currentFilters
    .filter((tag) => tag.category.toLowerCase() === 'type')
    .map((tag) => tag.slug);
}
