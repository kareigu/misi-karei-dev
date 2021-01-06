import React from 'react';

import StreamNotify from '../StreamNotify';
import UserList from '../UserList';
import './Tools.css';

interface Props {
  permLevel: number
}

function Tools(props: Props) {

  return (
    <div>
      <header className="Misc-header">
        <h2>Tools</h2>
      </header>
      { props.permLevel > 3 &&
        <div className="streamNtf">
          <StreamNotify />
        </div>
      }
      <div className="userList">
        <UserList permLevel={props.permLevel} />
      </div>
    </div>
  )
}

export default Tools;