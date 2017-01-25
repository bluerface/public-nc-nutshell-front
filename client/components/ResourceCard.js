import React from 'react';
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';

var chipContainer = {
  display: 'flex',
  flexWrap: 'wrap'
}

function ResourceCard ({resource}) {
  var title;
  var url;
  var text;

  if (resource.type === 'link') {
    // title = 'Article';
    url = resource.url;
  }

  if (resource.type === 'snippet') {
    text = resource.text;
  }

  if (resource.type === 'file') {
    title = resource.filename;
    url = resource.url;
  }

  return (
    <Paper>
      <Card containerStyle={{marginBottom: '20px'}}>
        {(title || url) && <CardTitle title={title} subtitle={<a href={url} target='_blank'> {url} </a>} />}
        {text &&
          <CardText>
            <div style={{marginBottom: '5px', fontFamily: 'monospace'}}>
              {text}
            </div>
          </CardText>
        }
        <CardActions style={chipContainer}>
          {
            resource.tags.map((tag) => (
              <Chip key={tag._id} style={{marginRight: 6}}>{tag.slug}</Chip>
            ))
          }
        </CardActions>
      </Card>
    </Paper>
  )
}

ResourceCard.propTypes = {
  resource: React.PropTypes.object.isRequired
}

export default ResourceCard;
