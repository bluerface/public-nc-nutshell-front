import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import {connect} from 'react-redux';
import actions from '../actions';
import AddLink from './AddLink';
import AddFile from './AddFile';
import AddSnippet from './AddSnippet';
import './AddResource.scss';

var styles = {
  icon: {
    marginRight: '10px'
  }
}

class AddResource extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      type: null
    }
    this.addEventResource = this.props.addEventResource.bind(this, this.props.focusedEvent);
  }
  openAddNew (type) {
    this.setState({type});
  }
  handleClickOutside () {
    this.setState({type: null});
  }
  render () {
    if (!this.props.isStaff) {
      return null;
    }
    return (
      <div className='add-resource' onBlur={this.onBlur}>

        <i className={`fa fa-plus`} style={styles.icon}></i>
        Add New&nbsp;
        <a onClick={this.openAddNew.bind(this, 'link')}>link</a>
        <a onClick={this.openAddNew.bind(this, 'file')}>file</a>
        <a onClick={this.openAddNew.bind(this, 'snippet')}>snippet</a>

        {this.state.type === 'link' &&
          <AddLink addEventResource={this.addEventResource} />
        }
        {this.state.type === 'file' &&
          <AddFile addEventResource={this.addEventResource} />
        }
        {this.state.type === 'snippet' &&
          <AddSnippet addEventResource={this.addEventResource} />
        }

      </div>
    );
  }
}

AddResource.propTypes = {
  focusedEvent: React.PropTypes.string.isRequired,
  addEventResource: React.PropTypes.func.isRequired,
  isStaff: React.PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  focusedEvent: state.calendar.focusedEvent,
  isStaff: state.auth.currentUser.role === 'staff'
})

const mapDispatchToProps = (dispatch) => ({
  addEventResource (eventId, resource) {
    dispatch(actions.addEventResource(eventId, resource));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(enhanceWithClickOutside(AddResource));
