import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

function requireAuth (Component) {
  class authComponent extends React.Component {
    render () {
      return <Component />;
    }
    componentWillMount () {
      if (!this.props.user) {
        browserHistory.push('/signin');
      }
    }
    componentWillUpdate (nextProps) {
      if (!nextProps.user) {
        browserHistory.push('/signin');
      }
    }
  }

  authComponent.propTypes = {
    user: React.PropTypes.object
  }

  const mapStateToProps = (state) => ({
      user: state.auth.currentUser
  });

  return connect(mapStateToProps)(authComponent);
}

export default requireAuth;
