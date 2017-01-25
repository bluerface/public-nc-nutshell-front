import React from 'react';
import Dialog from 'material-ui/Dialog';
import LectureDetails from './LectureDetails';
import SprintDetails from './SprintDetails';

class EventLightbox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fetching: false
    }
  }
  render () {
    var props = this.props;
    var contents;
    var type = props.eventObj.event_type;
    if(type === 'lecture' || type === 'social'){
      contents = <LectureDetails eventObj={props.eventObj} />
    } else if (type === 'sprint' || type === 'kata' || type === 'weekend review') {
      contents = <SprintDetails eventObj={props.eventObj} />
    }

    return(
      <Dialog
        modal={false}
        open={!!props.focusedEvent}
        onRequestClose={props.defocusEventView}
        contentStyle={{width: '90%', maxWidth: '1000px'}}
      >
        {contents}
      </Dialog>
    );
  }

  componentWillReceiveProps ({eventObj, fetchEventDetail}) {
    if(!this.state.fetching && eventObj._id && !eventObj.isFull) {
      this.setState({fetching: true}, () => {
        fetchEventDetail(eventObj._id)
          .then(() => {
            this.setState({fetching: false});
          })
      })
    }
  }
}

EventLightbox.propTypes = {
  focusedEvent: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.null ]),
  eventObj: React.PropTypes.object.isRequired,
  defocusEventView: React.PropTypes.func.isRequired,
  fetchEventDetail: React.PropTypes.func.isRequired
}

export default EventLightbox;
