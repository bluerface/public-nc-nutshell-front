import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import requireAuth from './componentsHO/requireAuth';
import App from './components/App';
import CalendarView from './containers/CalendarView';
import SigninView from './components/SigninView';
import ResourceView from './containers/ResourceView';

const Routes = () => (
  <Router history={browserHistory}>
    <Route path='/signin' component={SigninView} />
    <Route path='/' component={App}>
      <IndexRoute component={requireAuth(CalendarView)} />
      <Route path='resources' component={requireAuth(ResourceView)} />
    </Route>
  </Router>
)

export default Routes;
