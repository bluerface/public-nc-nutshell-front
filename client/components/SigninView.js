import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import actions from '../actions/auth.actions.js';
import config from '../../config';

const SigninView = function (props) {
  return (
      <div>
        <RaisedButton label='Signin as teacher' disabled/> <br />
        <RaisedButton label='Signin as student' secondary  onTouchTap={props.signinStudent} />
      </div>
  )
}

SigninView.propTypes = {
  signinStudent: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  signinStudent: () => {
    let {username, name, password} = config.STUDENT_LOGIN
    dispatch(actions.signIn(username, name, password))
  }
})

export default connect(null, mapDispatchToProps)(SigninView);
