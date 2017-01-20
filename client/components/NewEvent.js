import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/calendar.actions.js'
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';


// Dialogs can be nested. This example opens a Date Picker from within a Dialog.

class NewEvent extends Component {
  constructor (props) {
    super(props)
    this.initialState = {
      open: false,
      eventType: 'lecture',
      title: '',
      lecturer: '',
      description: '',
      startDate: null,
      startTime: null,
      endTime: null
    }

    this.state = Object.assign({}, this.initialState);

    this.handleOpen = this.props.handleOpen;
    this.handleClose = this.props.handleClose;
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    // do the submitting
  }

  render () {
    console.log(this.state);
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

    return (
      <div>
        <Dialog
          title="Create a new Event"
          actions={actions}
          modal={true}
          open={this.props.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <SelectField floatingLabelText='Event type' value={this.state.eventType} onChange={this.handleDropdown}>
            <MenuItem value={'lecture'} primaryText="Lecture" />
            <MenuItem value={'social'} disabled primaryText="Social" />
            <MenuItem value={'kata'} disabled primaryText="Kata" />
            <MenuItem value={'sprint'} disabled primaryText="Sprint" />
            <MenuItem value={'weekend review'} disabled primaryText="Weekend review" />
          </SelectField><br />
          <TextField
            floatingLabelText='Event title'
            hintText="Event title"
            value={this.state.title}
            onChange={this.handleTextField.bind(this, 'title')}/>
          <br />
          <TextField
            floatingLabelText='Lecturer'
            hintText="Lecturer"
            value={this.state.lecturer}
            onChange={this.handleTextField.bind(this, 'lecturer')}/>
          <br />
          <TextField
            floatingLabelText='Description'
            hintText="Event description"
            value={this.state.description}
            onChange={this.handleTextField.bind(this, 'description')}/>
          <br />
          <DatePicker
            floatingLabelText='Date'
            hintText="Choose date"
            autoOk
            formatDate={(date)=> moment(date).format('ddd Do MMM')}
            value={this.state.startDate}
            onChange={this.handleDateTimePicker.bind(this, 'startDate')}/>
          <TimePicker
            floatingLabelText='Start time'
            hintText='Choose time'
            autoOk
            value={this.state.startTime}
            onChange={this.handleDateTimePicker.bind(this, 'startTime')}/>
          <br />
          <TimePicker
            floatingLabelText='End time'
            hintText='Choose time'
            autoOk
            value={this.state.endTime}
            onChange={this.handleDateTimePicker.bind(this, 'endTime')}/>
          <br />
        </Dialog>
      </div>
    );
  }
}

NewEvent.propTypes = {
  open: React.PropTypes.bool.isRequired,
  handleOpen: React.PropTypes.func.isRequired,
  handleClose: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  open: state.calendar.focusEventForm
})

const mapDispatchToProps = (dispatch) => ({
  handleOpen () {
    dispatch(actions.focusEventForm())
  },
  handleClose () {
    dispatch(actions.defocusEventForm())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
