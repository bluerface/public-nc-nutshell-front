import React from 'react';
import {connect} from 'react-redux';

import Calendar from '../components/Calendar';
import EventLightbox from '../components/EventLightbox';
import NewEvent from '../components/NewEvent';

import {getEventArray, getEventById} from '../reducers';
import actions from '../actions';

class CalendarView extends React.Component {
  componentWillMount () {
    this.props.fetchEvents();
  }
  render () {
    var props = this.props;
    return (
      <div>
        <EventLightbox
          focusedEvent={props.focusedEvent}
          defocusEventView={props.defocusEventView}
          eventObj={props.eventObj}
          fetchEventDetail={props.fetchEventDetail}
        />
        <Calendar
          events={props.events}
          isStaff={props.isStaff}
          focusEventView={props.focusEventView}
          focusEventForm={props.focusEventForm}
        />
        <NewEvent
          defocusEventForm={props.defocusEventForm}
          eventFormFocused={props.eventFormFocused}
          postEvent={props.postEvent}
          user={props.user}
        />
      </div>
    )
  }
}

CalendarView.propTypes = {
  focusEventView: React.PropTypes.func.isRequired,
  focusEventForm: React.PropTypes.func.isRequired,
  defocusEventForm: React.PropTypes.func.isRequired,
  defocusEventView: React.PropTypes.func.isRequired,
  fetchEvents: React.PropTypes.func.isRequired,
  fetchEventDetail: React.PropTypes.func.isRequired,
  postEvent: React.PropTypes.func.isRequired,

  events: React.PropTypes.array,
  focusedEvent: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.null ]),
  eventObj: React.PropTypes.object.isRequired,
  eventFormFocused: React.PropTypes.bool.isRequired,
  isStaff: React.PropTypes.bool.isRequired,
  user: React.PropTypes.string.isRequired
}

CalendarView.defaultProps = {
  eventObj: {}
}

const mapStateToProps = (state) => ({
  events: getEventArray(state),
  focusedEvent: state.calendar.focusedEvent,
  eventObj: getEventById(state, state.calendar.focusedEvent),
  eventFormFocused: state.calendar.eventForm.focused,
  isStaff: !!state.auth.currentUser && state.auth.currentUser.role === 'staff',
  user: state.auth.currentUser ? state.auth.currentUser.name : ''
})

const mapDispatchToProps = (dispatch) => ({
  focusEventView (eventObj) {
    dispatch(actions.focusEventView(eventObj._id));
  },
  defocusEventView () {
    dispatch(actions.defocusEventView())
  },
  focusEventForm () {
    dispatch(actions.focusEventForm())
  },
  defocusEventForm () {
    dispatch(actions.defocusEventForm())
  },
  fetchEvents () {
    dispatch(actions.fetchEvents());
  },
  fetchEventDetail (id, cb) {
    return dispatch(actions.fetchEventDetail(id, cb))
  },
  postEvent (event) {
    return dispatch(actions.postEvent(event));
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
