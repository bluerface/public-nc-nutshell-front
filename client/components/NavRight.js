import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions/auth.actions';
import {ToolbarGroup} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

function NavRight (props) {
  return (
    <ToolbarGroup lastChild={true}>
      {props.user && props.user.username}
      <RaisedButton label="Sign Out" secondary={true} onTouchTap={props.signOut} />
    </ToolbarGroup>
  );
}

NavRight.propTypes = {
  user: React.PropTypes.object,
  signOut: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.auth.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  signOut: () => {
    dispatch(actions.signOut());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NavRight);
