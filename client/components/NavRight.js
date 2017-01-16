import React from 'react';
import {ToolbarGroup} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

function NavRight () {
  return (
    <ToolbarGroup lastChild={true}>
      <RaisedButton label="Log Out" secondary={true} />
    </ToolbarGroup>
  );
}

export default NavRight;
