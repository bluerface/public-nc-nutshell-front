import React from 'react';

var styles = {
  icon: {
    marginRight: '8px'
  },
  div: {
    marginBottom: '12px'
  }
}

function ResourceSmall ({resource}) {
  var iconMap = {
    file: 'file-text',
    link: 'bookmark', // alternatives are bookmark-o and book
    snippet: 'code',
    github: 'github' // alternatives are the various gits and code-fork
  }
  var type = resource.type;
  var icon = iconMap[type];
  var main;

  if(type === 'link' && resource.url.includes('github')) {
    icon = iconMap['github'];
  }

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
