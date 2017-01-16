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

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import calendar from './reducers/calendar.reducer.js';

let reducer = combineReducers({
  calendar
})

let store = createStore(reducer);

reactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path='/login' component={LoginView} />
        <Route path='/' component={App}>
          <IndexRoute component={CalendarView} />
          <Route path='resources' component={ResourceView} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
  ,
  document.getElementById('app')
);

const About = () => (<div>hello</div>);
