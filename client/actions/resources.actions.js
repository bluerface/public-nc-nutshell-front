import * as types from '../types/resources.types.js';

var actions = {};

actions.addFilter = (tag) => ({
  type: types.ADD_FILTER,
  tag
})

actions.removeFilter = (tag) => ({
  type: types.REMOVE_FILTER,
  tag
});

export default actions;
