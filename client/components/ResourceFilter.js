import React from 'react';
import {List, ListItem} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

var dividerStyle = {
  marginTop: '5px'
}

function ResourceFilter ({tags, onCheck}) {
  const createListItem = (tag) => (
    <ListItem
      key={tag.id}
      leftCheckbox={
        <Checkbox onCheck={onCheck.bind(this, tag)}/>
      }
      primaryText={tag.title}
    />
  )
  var typeFilters = tags
    .filter((tag) => tag.category === 'type')
    .map(createListItem);

  var topicFilters = tags
    .filter((tag) => tag.category === 'topic')
    .sort((a, b) => a.slug > b.slug)
    .map(createListItem);

  return (
    <List>
      <Subheader>Type</Subheader>
      {typeFilters}

      <Divider style={dividerStyle}/>

      <Subheader>Topic</Subheader>
      {topicFilters}

    </List>
  )
}

ResourceFilter.propTypes = {
  tags: React.PropTypes.array.isRequired,
  onCheck: React.PropTypes.func.isRequired
}

export default ResourceFilter;
