import React from 'react';
import moment from 'moment';

function SprintDetails ({eventObj}) {
  return (
    <div>
      <h1>{eventObj.title}</h1>
      <h5>
        {moment(eventObj.start_date).format('D MMM')}
        {' - '}
        {moment(eventObj.end_date).format('D MMM')}
      </h5>
      <p>I am a {eventObj.event_type}</p>
    </div>
  );
}

SprintDetails.propTypes = {
  eventObj: React.PropTypes.object
}

export default SprintDetails;
