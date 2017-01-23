import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';

var chipContainer = {
  display: 'flex',
  flexWrap: 'wrap'
}

function ResourceCard ({resource}) {
  return (
    <Card containerStyle={{marginBottom: '20px'}}>
      <CardTitle title="Article Name" subtitle={<a href={resource.url}> {resource.url} </a>} />
      <CardText style={chipContainer}>
          {
            resource.tags.map((tag) => (
              <Chip key={tag._id} style={{marginRight: 6}}>{tag.slug}</Chip>
            ))
          }
    </CardText>
    </Card>
  )
}

ResourceCard.propTypes = {
  resource: React.PropTypes.object.isRequired
}

export default ResourceCard;
