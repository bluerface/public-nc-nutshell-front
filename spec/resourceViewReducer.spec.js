import {expect} from 'chai';
import deepFreeze from 'deep-freeze';
import resourceViewReducer, {getTopicSlugs, getTypeSlugs} from '../client/reducers/resourceView.reducer.js';
import actions from '../client/actions';

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

describe('resourceView reducer:', function () {
  describe('ADD_FILTER', function () {
    it('should add the tag object to the currentFilters', function () {
      var state = resourceViewReducer(undefined, {});
      deepFreeze(state);

      var newState = resourceViewReducer(state, actions.addFilter(tag));
      expect(newState.currentFilters).to.eql([tag]);

      deepFreeze(newState);
      newState = resourceViewReducer(newState, actions.addFilter(tag2));
      expect(newState.currentFilters).to.eql([tag, tag2]);
    });
  });
  describe('REMOVE_FILTER', function () {
    it('should remove the corresponding tag from the currentFilters', function () {
      var state = resourceViewReducer(undefined, {});
      state = resourceViewReducer(state, actions.addFilter(tag))
      state = resourceViewReducer(state, actions.addFilter(tag2))
      state = resourceViewReducer(state, actions.addFilter(tag3))
      deepFreeze(state);

      var newState = resourceViewReducer(state, actions.removeFilter(tag2));
      expect(newState.currentFilters).to.eql([tag, tag3]);

      deepFreeze(newState);
      newState = resourceViewReducer(newState, actions.removeFilter(tag));
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
  describe('FETCH_TAGS_REQUEST', function () {
    it('sets the loading property to true and errors to null', function () {
      var state = {tags: {loading: false, error: 'asdfhajksdhf'}};
      deepFreeze(state);
      var newState = resourceViewReducer(state, actions.fetchTagsRequest());
      expect(newState.tags.loading).to.be.true;
      expect(newState.tags.error).to.be.null;
    });
  });
  describe('FETCH_TAGS_SUCCESS', function () {
    it('resets the loading property and adds the tags to the data property ', function () {
      var state = resourceViewReducer(undefined, actions.fetchTagsRequest());
      deepFreeze(state);
      var newState = resourceViewReducer(state, actions.fetchTagsSuccess([tag, tag2, tag3]));
      expect(newState.tags.loading).to.be.false;
      expect(newState.tags.data).to.eql([tag, tag2, tag3]);
    });
  });
  describe('FETCH_TAGS_ERROR', function () {
    it('resets the loading property and adds the error to the error property', function () {
      var state = resourceViewReducer(undefined, actions.fetchTagsRequest());
      deepFreeze(state);
      var newState = resourceViewReducer(state, actions.fetchTagsError('Im an error'));
      expect(newState.tags.loading).to.be.false;
      expect(newState.tags.error).to.equal('Im an error');
    });
  });
});
