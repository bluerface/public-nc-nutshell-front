import React from 'react';
import {Toolbar} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

import NavLeft from './NavLeft';
import NavRight from './NavRight';
import NavCenter from './NavCenter';

const NavBar = function () {
  return (
    <Paper zDepth={2} className='fixed' style={{zIndex: '2000'}}>
      <Toolbar>
        <NavLeft />
        <NavCenter />
        <NavRight />
      </Toolbar>
    </Paper>
  )
}

export default NavBar;
