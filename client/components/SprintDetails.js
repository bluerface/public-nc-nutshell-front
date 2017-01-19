import React from 'react';
import moment from 'moment';

function SprintDetails ({eventObj}) {
  return (
    <div>
      <h1>{eventObj.title}</h1>
      <h5>
        {moment(eventObj.startDate).format('D MMM')}
        {' - '}
        {moment(eventObj.endDate).format('D MMM')}
      </h5>
      <p>I am a sprint</p>
    </div>
  );
}

SprintDetails.propTypes = {
  eventObj: React.PropTypes.object
}

export default SprintDetails;
