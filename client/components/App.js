import React from 'react';
import NavBar from './NavBar';

import './App.scss';

const App = function (props) {
  return (
    <div>
      <NavBar />
      <div className='container'>
        {props.children}
      </div>
    </div>
  )
}

App.propTypes = {
  children: React.PropTypes.node
}

export default App;
