import React from 'react';
import {connect} from 'react-redux';
import {getEventArray} from '../reducers/calendar.reducer.js';
import * as actions from '../actions/calendar.actions.js';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

function Calendar (props) {
  return (
    <div className='calendar-wrap'>
      <BigCalendar
        events={props.events}
        onSelectEvent={props.handleEventClick}
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
  events: React.PropTypes.array,
  handleEventClick: React.PropTypes.func
}

const mapStateToProps = (state) => ({
  events: getEventArray(state.calendar)
})

const mapDispatchToProps = (dispatch) => ({
  handleEventClick: function (eventObj) {
      dispatch(actions.focusEventView(eventObj.id));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
