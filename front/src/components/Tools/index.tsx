import React from 'react';

import { Container } from '@material-ui/core'

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
        <Container className="streamNtf">
          <StreamNotify />
        </Container>
      }
      <Container className="userList">
        <UserList permLevel={props.permLevel} />
      </Container>
    </div>
  )
}

export default Tools;