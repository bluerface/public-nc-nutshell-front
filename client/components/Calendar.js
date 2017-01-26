import React from 'react';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as colors from 'material-ui/styles/colors';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

var newEventButtonStyle = {
  position: 'absolute',
  top: '75px',
  right: '20px',
  zIndex: '1000'
}

function Calendar (props) {
  return (
    <div className='calendar-wrap' style={{position: 'relative'}}>
      {props.isStaff &&
        <FloatingActionButton secondary={true} onTouchTap={props.focusEventForm} style={newEventButtonStyle}>
          <ContentAdd />
        </FloatingActionButton>
      }

      <BigCalendar
        events={props.events}
        onSelectEvent={props.focusEventView}
        startAccessor='start_date'
        endAccessor='end_date'
        titleAccessor='title'
        allDayAccessor='all_day'
        eventPropGetter={eventPropGetter}
        min={moment({hour: 8}).toDate()}
        max={moment({hour: 23}).toDate()}
        views={['week', 'agenda']}
        defaultView='week'
        // toolbar={false}
      />
    </div>
  )
}

function eventPropGetter (event) {
  var color = 'orange';
  switch(event.event_type) {
    case 'lecture':
      color = colors.indigo500;
      break;
    case 'social':
      color = colors.pink500;
      break;
    case 'sprint':
      color = colors.purple700;
      break;
    case 'kata':
      color = colors.green800;
      break;
    case 'weekend review':
      color = colors.teal700;
      break;
  }
  return {style: {backgroundColor: color}};
}

Calendar.propTypes = {
  events: React.PropTypes.array,
  isStaff: React.PropTypes.bool.isRequired,
  focusEventView: React.PropTypes.func.isRequired,
  focusEventForm: React.PropTypes.func.isRequired
}


export default Calendar;
