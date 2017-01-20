import React from 'react';
import {connect} from 'react-redux';

import Paper from 'material-ui/Paper';
import ResourceFilter from '../components/ResourceFilter';
import ResourceList from '../components/ResourceList';

import {getTopicSlugs, getTypeSlugs} from '../reducers/resources.reducer.js';
import actions from '../actions/resources.actions.js';

var styleLeft = {
  float: 'left',
  width: '30%',
  marginRight: '2%'
}

var styleRight = {
  float: 'left',
  width: '68%'
}

const ResourceView = function (props) {
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

ResourceView.propTypes = {
  topicFilters: React.PropTypes.array.isRequired,
  typeFilters: React.PropTypes.array.isRequired,
  resources: React.PropTypes.array.isRequired,
  tags: React.PropTypes.array.isRequired,
  onCheck: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  topicFilters: getTopicSlugs(state.resources),
  typeFilters: getTypeSlugs(state.resources),
  resources: state.resources.resources,
  tags: state.resources.tags
});

const mapDispatchToProps = (dispatch) => ({
  onCheck (tag, event, isChecked) {
    isChecked ?
      dispatch(actions.addFilter(tag)):
      dispatch(actions.removeFilter(tag))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceView);
