import {intersection} from 'underscore';

export default function filterResources (resourceArray, filterArr) {
  if (filterArr.length === 0) { return resourceArray; }

  return resourceArray.filter((resource) => (
    intersection(resource.tags.map(tag => tag.slug), filterArr).length > 0
  ))
}
