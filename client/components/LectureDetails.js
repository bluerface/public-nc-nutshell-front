import React from 'react';
import EventTitle from './EventTitle';
import ResourceSmall from './ResourceSmall';
import AddResource from './AddResource';

function LectureDetails ({eventObj}) {
  return (
    <div>
      <EventTitle eventObj={eventObj} />
      <div style={{display: 'flex'}}>
        <div style={{width: '50%'}}>
          <h5 className='heading'>Description</h5>
          <p>{eventObj.description}</p>
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
    </div>
  );
}

LectureDetails.propTypes = {
  eventObj: React.PropTypes.object
}

export default LectureDetails;
