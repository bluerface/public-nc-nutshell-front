import {expect} from 'chai';
import resourcesReducer, {indexResourcesById, getResourceArray} from '../client/reducers/resources.reducer.js';
import deepFreeze from 'deep-freeze';
import actions from '../client/actions';

var resources = [
  {
    "_id": "123",
    "type": "link",
    "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Methods_Index",
    "tags": [
      {
        "_id": "588247f78753032471260866",
        "title": "Redux",
        "slug": "redux",
        "category": "Topic"
      },
      {
        "_id": "588247f78753032471260868",
        "title": "Recursion",
        "slug": "recursion",
        "category": "Topic"
      }
    ]
  },
  {
    "_id": "456",
    "type": "file",
    "filename": "Lowbar File",
    "url": "lowbar-file.txt",
    "tags": [
      {
        "_id": "588247f78753032471260866",
        "title": "Redux",
        "slug": "redux",
        "category": "Topic"
      },
      {
        "_id": "588247f78753032471260868",
        "title": "Recursion",
        "slug": "recursion",
        "category": "Topic"
      }
    ]
  }
];

describe('resouce reducer:', function () {
  describe('indexResourcesById helper function', function () {
    it('to return an object containing the original resources indexed by id', function () {
      let result = {
        '123' : resources[0],
        '456': resources[1]
      }
      expect(indexResourcesById(resources)).to.eql(result);
    });
  });

  describe('getResourceArray selector', function () {
    it('should return an array of the resources', function () {
      let state = {
        byId: {
          '123' : resources[0],
          '456': resources[1]
        }
      }
      let result = [resources[0], resources[1]];
      expect(getResourceArray(state)).to.eql(result);
    });
  });

  describe('FETCH_RESOURCES_REQUEST', function () {
    it('should set loading to true and reset errors', function () {
      var state = {
        loading: false,
        error: 'ghgkhgkjhgkdfdfg'
      };
      deepFreeze(state);

      var newState = resourcesReducer(state, actions.fetchResourcesRequest());
      expect(newState.error).to.equal(null);
      expect(newState.loading).to.be.true;
    });
  });

  describe('FETCH_RESOURCES_SUCCESS', function () {
    it('should reset the loading property and add the provided resources to the byID object', function () {
      var state = resourcesReducer(undefined, actions.fetchResourcesRequest());
      deepFreeze(state);

      let result = {
        123 : resources[0],
        456: resources[1]
      }

      var newState = resourcesReducer(state, actions.fetchResourcesSuccess(resources));
      expect(newState.byId).to.eql(result);
      expect(newState.loading).to.be.false;
    });
  });

  describe('FETCH_RESOURCES_ERROR', function () {
    it('should reset the loading property and set the error', function () {
      var state = resourcesReducer(undefined, actions.fetchResourcesRequest());
      deepFreeze(state);
      var err = 'hello I am an error'

      var newState = resourcesReducer(state, actions.fetchResourcesError(err));
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(err);
    });
  });
});
