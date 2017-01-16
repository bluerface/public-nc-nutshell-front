import React from 'react';
import {Link} from 'react-router';
import {ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

function NavLeft () {
  return (
    <ToolbarGroup>
      <Link to='/'>
        <FlatButton label="Timetable" />
      </Link>
      <Link to='/resources'>
        <FlatButton label="Resources" />
      </Link>
    </ToolbarGroup>
  );
}

export default NavLeft;
