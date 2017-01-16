import React from 'react';
import reactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import App from './components/App';
import CalendarView from './components/CalendarView';
import LoginView from './components/LoginView';
import ResourceView from './components/ResourceView';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

reactDOM.render(
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path='/login' component={LoginView} />
      <Route path='/' component={App}>
        <IndexRoute component={CalendarView} />
        <Route path='resources' component={ResourceView} />
      </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('app')
);
