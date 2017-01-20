import React from 'react';
import {connect} from 'react-redux';
import {getEventArray} from '../reducers/calendar.reducer.js';
import * as actions from '../actions/calendar.actions.js';

import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
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
      <FloatingActionButton secondary={true} onTouchTap={props.focusEventForm} style={newEventButtonStyle}>
        <ContentAdd />
      </FloatingActionButton>

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
  handleEventClick: React.PropTypes.func.isRequired,
  focusEventForm: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  events: getEventArray(state.calendar)
})

const mapDispatchToProps = (dispatch) => ({
  handleEventClick (eventObj) {
      dispatch(actions.focusEventView(eventObj.id));
  },
  focusEventForm () {
    dispatch(actions.focusEventForm())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
