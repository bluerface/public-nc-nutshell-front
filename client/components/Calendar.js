import React from 'react';
import {connect} from 'react-redux';
import {getEventArray} from '../reducers/calendar.reducer.js'

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

function Calendar (props) {
  return (
    <div className='calendar-wrap'>
      <BigCalendar
        events={props.events}
        startAccessor='startDate'
        endAccessor='endDate'
        titleAccessor='title'
        min={moment({hour: 8}).toDate()}
        max={moment({hour: 20}).toDate()}
        views={['week', 'agenda']}
        defaultView='week'
        // toolbar={false}
      />
    </div>
  )
}

Calendar.propTypes = {
  events: React.PropTypes.array
}

function mapStateToProps (state) {
  return {
    events: getEventArray(state.calendar)
  }
}

export default connect(mapStateToProps)(Calendar);
