import React from 'react';
import EventTitle from './EventTitle';
import ResourceSmall from './ResourceSmall';
import AddResource from './AddResource';
import Markdown from './Markdown';

function SprintDetails ({eventObj}) {
  var repo = {
    type: 'link',
    url: eventObj.repo
  }
  return (
    <div>
      <EventTitle eventObj={eventObj} />

      <div style={{display: 'flex', marginBottom: '30px'}}>

        <div style={{width: '50%'}}>
          <h5 className='heading'>Repo</h5>
          {eventObj.repo && <ResourceSmall resource={repo} />}
        </div>

        <div style={{width: '50%'}} className='trunkate'>
          <h5 className='heading'>Resources</h5>
          {
            eventObj.resources && eventObj.resources.map((resource) => (
              <ResourceSmall key={resource._id} resource={resource} />
            ))
          }
          <AddResource />
        </div>
      </div>

      <div className='box'>
        <div className='box' style={{padding: '20px'}}>
          README.md
        </div>
        <div style={{padding: '30px'}}>
          <Markdown />
        </div>
      </div>
    </div>
  );
}

SprintDetails.propTypes = {
  eventObj: React.PropTypes.object
}

export default SprintDetails;
