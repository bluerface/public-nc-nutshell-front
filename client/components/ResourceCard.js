import React from 'react';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import getIconName from '../utils/getIconName';
import Markdown from './Markdown';

var chipContainer = {
  display: 'flex',
  flexWrap: 'wrap'
}

function ResourceCard ({resource}) {
  var title;
  var url;
  var text;
  var icon = getIconName(resource);

  if (resource.type === 'link') {
    title = resource.title;
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
      <div style={{marginBottom: '20px', display: 'flex', padding: '20px 20px 20px 0'}}>

        <div style={{width: '80px'}} className='center-children'>
          <i className={`fa fa-${icon} fa-2x grey`} ></i>
        </div>

        <div>
          <span className='resource-title'>
            <a href={url} target='_blank'> {title} </a>
          </span>

          {resource.type === 'link' &&
            <div className='resource-url'>
              <a href={url} target='_blank'>{url.slice(0, 40) + '...'} </a>
            </div>
          }

          {text &&
              <div style={{marginBottom: '20px', fontFamily: 'monospace'}}>
                <Markdown code={text} />
              </div>
          }

          <div style={chipContainer}>
            {
              resource.tags.map((tag, i) => (
                <Chip key={i.toString() + tag.slug} style={{marginRight: 6}}>{tag.slug}</Chip>
              ))
            }
          </div>
        </div>
      </div>
    </Paper>
  )
}

ResourceCard.propTypes = {
  resource: React.PropTypes.object.isRequired
}

export default ResourceCard;
