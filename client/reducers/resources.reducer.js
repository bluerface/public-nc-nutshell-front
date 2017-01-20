import * as types from '../types/resources.types.js';
import tagsList from '../data/tagsList.js';
import resourceList from '../data/resourceList';

var initialState = {
  tags: tagsList,
  resources: resourceList,
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

    default:
      return state;
  }

  return newState;
}

export function getTopicSlugs (state) {
  return state.currentFilters
    .filter((tag) => tag.category === 'topic')
    .map((tag) => tag.slug);
}

export function getTypeSlugs (state) {
  return state.currentFilters
    .filter((tag) => tag.category === 'type')
    .map((tag) => tag.slug);
}
