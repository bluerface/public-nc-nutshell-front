import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import * as actions from '../actions/calendar.actions.js';
import LectureDetails from './LectureDetails';
import SprintDetails from './SprintDetails';

function EventLightbox (props) {
  let contents;
  if(props.eventObj.type === 'lecture'){
    contents = <LectureDetails eventObj={props.eventObj} />
  } else if (props.eventObj.type === 'sprint') {
    contents = <SprintDetails eventObj={props.eventObj} />
  }

  return(
    <Dialog
      modal={false}
      open={!!props.focusedEvent}
      onRequestClose={props.onRequestClose}
    >
      {contents}
    </Dialog>
  );
}

EventLightbox.propTypes = {
  focusedEvent: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.null ]),
  onRequestClose: React.PropTypes.func,
  eventObj: React.PropTypes.object.isRequired
}

EventLightbox.defaultProps = {
  eventObj: {}
}

const mapStateToProps = (state) => ({
  focusedEvent: state.calendar.focusedEvent,
  eventObj: state.calendar.events[state.calendar.focusedEvent]
})

const mapDispatchToProps = (dispatch) => ({
  onRequestClose: () => { dispatch(actions.defocusEventView()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(EventLightbox);
