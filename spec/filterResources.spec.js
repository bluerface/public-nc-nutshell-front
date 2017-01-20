import {expect} from 'chai';
import filterResources from '../client/utils/filterResources';

var resources = [
  {
    id: 1,
    type: 'link',
    url: 'https://medium.freecodecamp.com/react-props-state-explained-through-darth-vaders-hunt-for-the-rebels-8ee486576492#.714dve36m',
    tags: ['react', 'core_reading'],
  },
  {
    id: 2,
    type: 'link',
    url: 'http://visionmedia.github.io/superagent/',
    tags: ['reference']
  },
  {
    id: 3,
    type: 'link',
    url: 'http://redux.js.org/',
    tags: ['redux', 'react_ecosystem', 'core_reading', 'reference']
  }
]

describe('filterResources utility function', function () {
  it('should return all the resources if the filter array is empty', function () {
    expect(filterResources(resources, [])).to.eql(resources);
  });
  it('should return all resources who have a tag that match', function () {
    var filter = ['react', 'redux'];

    var expected = [
      {
        id: 1,
        type: 'link',
        url: 'https://medium.freecodecamp.com/react-props-state-explained-through-darth-vaders-hunt-for-the-rebels-8ee486576492#.714dve36m',
        tags: ['react', 'core_reading'],
      },
      {
        id: 3,
        type: 'link',
        url: 'http://redux.js.org/',
        tags: ['redux', 'react_ecosystem', 'core_reading', 'reference']
      }
    ]

    expect(filterResources(resources, filter)).to.eql(expected);
  });
});
