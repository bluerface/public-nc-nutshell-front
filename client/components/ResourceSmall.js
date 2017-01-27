import React from 'react';
import getIconName from '../utils/getIconName';

var styles = {
  icon: {
    marginRight: '8px'
  },
  div: {
    marginBottom: '12px'
  }
}

function ResourceSmall ({resource}) {
  var type = resource.type;
  var icon = getIconName(resource);
  var main;

  if (type === 'file') {
    main = <a
      className='link trunkate-line'
      href={resource.url}
      target='_blank'>
        {resource.filename}
      </a>;
  } else if (type === 'link') {
    main = <a
      className='link trunkate-line'
      href={resource.url}
      target='_blank'>
        {resource.url}
      </a>;
  } else {
    main = <span>Snippet: <code>{resource.text}</code> </span>;
  }

  return (
    <div style={styles.div}>

      <i className={`fa fa-${icon}`} style={styles.icon}></i>
      {main}

    </div>
  );
}

ResourceSmall.propTypes = {
  resource: React.PropTypes.object
}

export default ResourceSmall;
