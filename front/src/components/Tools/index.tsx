import React from 'react';

import { Backdrop, Container, createStyles, makeStyles, Theme } from '@material-ui/core'

import StreamNotify from '../StreamNotify';
import UserList from '../UserList';
import './Tools.css';
import { useLayoutEffect, useState } from 'react';

import { ReactComponent as LoadingIcon } from '../../utils/loading2.svg'
import { useContext } from 'react';
import UserContext from '../../utils/UserContext';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

function Tools() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const {user} = useContext(UserContext);

  useLayoutEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <LoadingIcon />
      </Backdrop>
      <header className="Misc-header">
        <h2>Tools</h2>
      </header>
      { user.permLevel > 3 &&
        <Container className="streamNtf">
          <StreamNotify />
        </Container>
      }
      <Container className="userList">
        <UserList />
      </Container>
    </div>
  )
}

export default Tools;