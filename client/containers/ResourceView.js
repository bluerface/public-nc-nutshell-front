import React from 'react';
import {connect} from 'react-redux';

import Paper from 'material-ui/Paper';
import ResourceFilter from '../components/ResourceFilter';
import ResourceList from '../components/ResourceList';

import {getTopicSlugs, getTypeSlugs, getResourceArray} from '../reducers';
import actions from '../actions';

var styleLeft = {
  float: 'left',
  width: '30%',
  marginRight: '2%'
}

var styleRight = {
  float: 'left',
  width: '68%'
}

class ResourceView extends React.Component {
  componentWillMount () {
    this.props.fetchTags();
    this.props.fetchResources();
  }
  render () {
    var props = this.props;
    return (
      <div>
        <Paper style={styleLeft}>
          <ResourceFilter
            onCheck={props.onCheck}
            tags={props.tags}
            />
        </Paper>
        <div style={styleRight}>
          <ResourceList
            topicFilters={props.topicFilters}
            typeFilters={props.typeFilters}
            resources={props.resources}
            />
        </div>
      </div>
    )
  }
}

ResourceView.propTypes = {
  topicFilters: React.PropTypes.array.isRequired,
  typeFilters: React.PropTypes.array.isRequired,
  resources: React.PropTypes.array.isRequired,
  tags: React.PropTypes.array.isRequired,
  onCheck: React.PropTypes.func.isRequired,
  fetchTags: React.PropTypes.func.isRequired,
  fetchResources: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  topicFilters: getTopicSlugs(state),
  typeFilters: getTypeSlugs(state),
  resources: getResourceArray(state),
  tags: state.resourceView.tags.data
});

const mapDispatchToProps = (dispatch) => ({
  onCheck (tag, event, isChecked) {
    isChecked ?
      dispatch(actions.addFilter(tag)):
      dispatch(actions.removeFilter(tag))
  },
  fetchTags () {
    dispatch(actions.fetchTags());
  },
  fetchResources () {
    dispatch(actions.fetchResources());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceView);
