import React from 'react';
import {ToolbarGroup} from 'material-ui/Toolbar';
import ActionHome from 'material-ui/svg-icons/action/home';

const iconStyle = {
  marginRight: 10
}

function NavCenter () {
  return (
    <ToolbarGroup>
      <ActionHome style={iconStyle} />
      NutShell
    </ToolbarGroup>
  );
}

export default NavCenter;
