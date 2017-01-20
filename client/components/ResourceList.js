import React from 'react';
import ResourceCard from './ResourceCard';
import filterResources from '../utils/filterResources';

function ResourceList ({topicFilters, typeFilters, resources}) {
  resources = filterResources(resources, typeFilters);
  resources = filterResources(resources, topicFilters);

  return (
    <div>
      {
        resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))
      }
    </div>
  )
}

ResourceList.propTypes = {
  topicFilters: React.PropTypes.array.isRequired,
  typeFilters: React.PropTypes.array.isRequired,
  resources: React.PropTypes.array.isRequired
}

export default ResourceList;
