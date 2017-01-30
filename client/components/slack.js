import React, {Component} from 'react';
import request from 'superagent';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import config from '../../config.js'

class Slack extends Component {
  constructor () {
    super()
    this.initialState = {
      open: false,
      text: "",
      username: "",
      icon_emoji: ":ghost:"
    }
    this.state = Object.assign({}, this.initialState);
    this.toggleOpen = this.toggleOpen.bind(this)
    this.handleTextField = this.handleTextField.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  toggleOpen () {
    this.setState({open: !this.state.open});
  }
  handleTextField (key, e) {
    this.setState({[key]: e.target.value})
  }
  handleSubmit () {
    let {text, username, icon_emoji} = this.state;
    request
    .post(`${config.SERVER}/api/slack`)
    .set('Content-Type', 'application/json')
    .send({text, username, icon_emoji})
    .end(function (err) {
      if (err) {
        console.log(err) // eslint-disable-line no-console
      } else {
        console.log('Sent') // eslint-disable-line no-console
      }
    })
    this.setState({ open: false })
  }
  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
      <div>
        <RaisedButton className='slackButton' label="Slack It" onTouchTap={this.toggleOpen} />
        <Dialog
        title="Send To Slack"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.toggleOpen}
        autoScrollBodyContent={true}
        >
          <TextField
            floatingLabelText= 'Username'
            value={this.state.username}
            onChange={this.handleTextField.bind(this, 'username')}
          />
          <br />
          <TextField
            floatingLabelText= 'Enter slack message'
            value={this.state.text}
            onChange={this.handleTextField.bind(this, 'text')}
          />
        </Dialog>
      </div>
    )
  }
}


export default Slack;
