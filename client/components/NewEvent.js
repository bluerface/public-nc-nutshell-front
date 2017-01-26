import React, {Component} from 'react';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';


class NewEvent extends Component {
  constructor (props) {
    super(props)
    this.initialState = {
      open: false,
      eventType: 'lecture',
      title: '',
      lecturer: this.props.user,
      description: '',
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      repo: ''
    }

    this.state = Object.assign({}, this.initialState);

    this.handleClose = this.handleClose.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose () {
    this.props.defocusEventForm();
    this.setState(this.initialState);
  }

  handleTextField (key, e) {
    this.setState({[key]: e.target.value})
  }

  handleDropdown (event, index, value) {
    this.setState({eventType: value})
  }

  handleDateTimePicker (key, event, date) {
    this.setState({[key]: date})
  }

  handleSubmit () {
    var state = this.state;

    var startTime;
    var endTime;

    if (state.eventType === 'sprint' || state.eventType === 'weekend review') {
      startTime = moment('08:00', 'HH:mm');
      endTime = moment('08:00', 'HH:mm');
    } else {
      startTime = moment(state.startTime);
      endTime = moment(state.endTime);
    }

    var startDate = moment(state.startDate)
      .add({
        hours: startTime.hours(),
        minutes: startTime.minutes()
      });

    var endDate = moment(this.state.endDate || this.state.startDate)
      .add({
        hours: endTime.hours(),
        minutes: endTime.minutes()
      });

    var event = {
      title: state.title,
      lecturer: state.lecturer,
      event_type: state.eventType,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString()
    };

    switch (state.eventType) {
      case 'lecture':
      case 'social':
        event.description = state.description;
        break;
      case 'kata':
        event.description = state.description;
        event.repo = state.repo;
        break;
      case 'sprint':
      case 'weekend review':
        event.repo = state.repo;
        break;
    }

    this.props.postEvent(event)
      .then(() => {
        // this.setState(this.initialState);
      })

  }

  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        keyboardFocused={false}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        secondary
        keyboardFocused={false}
        onTouchTap={this.handleSubmit}
      />
    ];
    var lecturer = (<div key={'lecturer'}>
      <TextField
        floatingLabelText='Lecturer'
        hintText="Lecturer"
        value={this.state.lecturer}
        onChange={this.handleTextField.bind(this, 'lecturer')} />
    </div>)

    var repo = (<div key={'repo'}>
      <TextField
        floatingLabelText='Github Repo'
        hintText="The repo for this sprint/kata"
        value={this.state.repo}
        onChange={this.handleTextField.bind(this, 'repo')}/>
    </div>)

    var description = (<div key={'desc'}>
      <TextField
        multiLine fullWidth
        floatingLabelText='Description'
        hintText="Event description"
        value={this.state.description}
        onChange={this.handleTextField.bind(this, 'description')}/>
    </div>)

    var startDate = <DatePicker
      key={'startdate'}
      floatingLabelText='Start Date'
      hintText="Choose date"
      autoOk
      formatDate={(date)=> moment(date).format('ddd Do MMM')}
      value={this.state.startDate}
      onChange={this.handleDateTimePicker.bind(this, 'startDate')}/>

    var endDate = <DatePicker
      key={'enddate'}
      floatingLabelText='End Date'
      hintText="Choose date"
      autoOk
      formatDate={(date)=> moment(date).format('ddd Do MMM')}
      value={this.state.endDate}
      onChange={this.handleDateTimePicker.bind(this, 'endDate')}/>

    var startTime = <TimePicker
        key={'starttime'}
        floatingLabelText='Start time'
        hintText='Choose time'
        autoOk
        value={this.state.startTime}
        onChange={this.handleDateTimePicker.bind(this, 'startTime')}/>

    var endTime = <TimePicker
        key={'endtime'}
        floatingLabelText='End time'
        hintText='Choose time'
        autoOk
        value={this.state.endTime}
        onChange={this.handleDateTimePicker.bind(this, 'endTime')}/>

    return (
      <div>
        <Dialog
          title="Create a new Event"
          actions={actions}
          modal={true}
          open={this.props.eventFormFocused}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <SelectField floatingLabelText='Event type' value={this.state.eventType} onChange={this.handleDropdown}>
            <MenuItem value={'lecture'} primaryText="Lecture" />
            <MenuItem value={'social'} primaryText="Social" />
            <MenuItem value={'kata'} primaryText="Kata" />
            <MenuItem value={'sprint'} primaryText="Sprint" />
            <MenuItem value={'weekend review'} primaryText="Weekend review" />
          </SelectField><br />
          <TextField
            floatingLabelText='Event title'
            hintText="Event title"
            value={this.state.title}
            onChange={this.handleTextField.bind(this, 'title')}/>
          <br />
          {this.state.eventType === 'lecture' && [lecturer, description, startDate, startTime, endTime]}
          {this.state.eventType === 'social' && [description, startDate, startTime, endTime]}
          {this.state.eventType === 'kata' && [repo, description, startDate, startTime, endTime]}
          {this.state.eventType === 'sprint' && [repo, startDate, endDate]}
          {this.state.eventType === 'weekend review' && [repo, startDate, endDate]}

        </Dialog>
      </div>
    );
  }
}

NewEvent.propTypes = {
  eventFormFocused: React.PropTypes.bool.isRequired,
  defocusEventForm: React.PropTypes.func.isRequired,
  postEvent: React.PropTypes.func.isRequired,
  user: React.PropTypes.string.isRequired
}



export default NewEvent;
