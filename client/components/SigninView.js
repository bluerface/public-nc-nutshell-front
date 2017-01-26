import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import actions from '../actions';
import config from '../../config';

const SigninView = function (props) {
  return (
      <div className="signin-background center-children">
        <div>
          <RaisedButton label='Sign in as staff' secondary fullWidth onTouchTap={props.signinStaff} style={{marginBottom: '10px'}}/> <br />
          <RaisedButton label='Sign in as student' secondary fullWidth onTouchTap={props.signinStudent} />
        </div>
      </div>
  )
}

SigninView.propTypes = {
  signinStudent: React.PropTypes.func.isRequired,
  signinStaff: React.PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  signinStaff: () => {
      let {username, password} = config.STAFF_LOGIN
      dispatch(actions.signIn(username, password))
  },
  signinStudent: () => {
    let {username, password} = config.STUDENT_LOGIN
    dispatch(actions.signIn(username, password))
  }
})

export default connect(null, mapDispatchToProps)(SigninView);
