import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import actions from '../actions';
import config from '../../config';

const SigninView = function (props) {
  return (
      <div>
        <RaisedButton label='Signin as staff' secondary onTouchTap={props.signinStaff}/> <br />
        <RaisedButton label='Signin as student' secondary  onTouchTap={props.signinStudent} />
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
