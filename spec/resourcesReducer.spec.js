import {expect} from 'chai';
import deepFreeze from 'deep-freeze';
import resourcesReducer, {getTopicSlugs, getTypeSlugs} from '../client/reducers/resources.reducer.js';
import actions from '../client/actions/resources.actions.js';

var tag = {
  id: 1,
  title: 'Further Reading',
  slug: 'further_reading',
  category: 'type'
};

var tag2 = {
  id: 4,
  title: 'React',
  slug: 'react',
  category: 'topic'
};

var tag3 = {
  id: 6,
  title: 'Redux',
  slug: 'redux',
  category: 'topic'
};

describe('resources reducer:', function () {
  describe('ADD_FILTER', function () {
    it('should add the tag object to the currentFilters', function () {
      var state = resourcesReducer(undefined, {});
      deepFreeze(state);

      var newState = resourcesReducer(state, actions.addFilter(tag));
      expect(newState.currentFilters).to.eql([tag]);

      deepFreeze(newState);
      newState = resourcesReducer(newState, actions.addFilter(tag2));
      expect(newState.currentFilters).to.eql([tag, tag2]);
    });
  });
  describe('REMOVE_FILTER', function () {
    it('should remove the corresponding tag from the currentFilters', function () {
      var state = resourcesReducer(undefined, {});
      state = resourcesReducer(state, actions.addFilter(tag))
      state = resourcesReducer(state, actions.addFilter(tag2))
      state = resourcesReducer(state, actions.addFilter(tag3))
      deepFreeze(state);

      var newState = resourcesReducer(state, actions.removeFilter(tag2));
      expect(newState.currentFilters).to.eql([tag, tag3]);

      deepFreeze(newState);
      newState = resourcesReducer(newState, actions.removeFilter(tag));
      expect(newState.currentFilters).to.eql([tag3]);
    });
  });
  describe('getTopicSlugs selector', function () {
    it('returns all the slugs for the tags in the currentFilters array with a category of topic', function () {
      var state = {currentFilters: [tag, tag2, tag3]}
      var result = getTopicSlugs(state);
      expect(result).to.eql(['react', 'redux']);
    });
  });
  describe('getTypeSlugs selector', function () {
    it('returns all the slugs for the tags in the currentFilters array with a category of type', function () {
      var state = {currentFilters: [tag, tag2, tag3]}
      var result = getTypeSlugs(state);
      expect(result).to.eql(['further_reading']);
    });
  });
});
