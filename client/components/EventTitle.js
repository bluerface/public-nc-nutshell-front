import React from 'react';
import moment from 'moment';

function EventTitle ({eventObj}) {
  return (
      <div>
        <h1 className='title'>
          {eventObj.title}
        </h1>
        <h5 className='title-under'>
          <span>
            {moment(eventObj.start_date).format((eventObj.all_day ? 'D': 'h:mm'))}
            {' - '}
            {moment(eventObj.end_date).format((eventObj.all_day ? 'D MMM': 'h:mm'))}
          </span>
          <span>
            {eventObj.event_type}
          </span>
          <span>
            {eventObj.lecturer}
          </span>
        </h5>
      </div>
  );
}

EventTitle.propTypes = {
  eventObj: React.PropTypes.object.isRequired,
}

export default EventTitle;
