import React from 'react';

import StreamNotify from '../StreamNotify';
import UserList from '../UserList';
import './Tools.css';



function Tools() {

  return (
    <div>
      <header className="Misc-header">
        <h2>Tools</h2>
      </header>
      <div className="streamNtf">
        <StreamNotify />
      </div>
      <div className="userList">
        <UserList />
      </div>
    </div>
  )
}

export default Tools;