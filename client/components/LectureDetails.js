import React from 'react';
import moment from 'moment';

function LectureDetails ({eventObj}) {
  return (
    <div>
      <h1>{eventObj.title}</h1>
      <h5>
        {moment(eventObj.startDate).format('h:mm')}
        {' - '}
        {moment(eventObj.endDate).format('h:mm')}
      </h5>
      <p>{eventObj.description}</p>
    </div>
  );
}

LectureDetails.propTypes = {
  eventObj: React.PropTypes.object
}

export default LectureDetails;
