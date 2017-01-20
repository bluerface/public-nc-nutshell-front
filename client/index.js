import React from 'react';
import reactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Routes from './Routes';

import {Provider} from 'react-redux';
import initStore from './initStore';

let store = initStore();

reactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Routes />
    </MuiThemeProvider>
  </Provider>
  ,
  document.getElementById('app')
);
