import React from 'react';

import { 
  Backdrop, Container, createStyles, 
  makeStyles, Theme, Drawer, IconButton
} from '@material-ui/core';

import { Settings } from '@material-ui/icons';

import StreamNotify from '../StreamNotify';
import UserList from '../UserList';
import './Tools.css';
import { useState, useContext, useEffect } from 'react';

import LoadingComponent from '../LoadingComponent';
import UserContext from '../../utils/UserContext';
import SettingsDrawer from '../SettingsDrawer';


import paths from '../../utils/paths.json';
import Announce from '../Announce';
const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

export interface IRawHomeContent {
  _id?: string,
  type: string,
  value: number | string
}

function Tools() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [homeContent, setHomeContent] = useState<Array<IRawHomeContent>>()
  const {user} = useContext(UserContext);

  useEffect(() => {
    fetch(`${reqPath}home/content?raw=true`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setHomeContent(json);
        setLoading(false);
      });
  }, []);


  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <LoadingComponent margin="120px" />
      </Backdrop>

      <Drawer open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        {homeContent &&
          <SettingsDrawer content={homeContent} updateFn={setHomeContent} />
        }
      </Drawer>

      <header className="Misc-header">
        <h2 id="toolsTitle" style={{animation: user.permLevel > 3 ? 'slide-right 0.5s ease' : 'slide-left 0.5s ease'}} >Tools</h2>
        { user.permLevel > 3 &&
          <IconButton className="settingsDrawerToggle" onClick={() => setSettingsOpen(!settingsOpen)} color="primary">
            <Settings />
          </IconButton>
        }
      </header>
      { user.permLevel > 3 &&
      <>
        <Container className="streamNtf">
          <StreamNotify />
        </Container>

        <Container className="announce">
          <Announce />
        </Container>
      </>
      }
      <Container className="userList">
        <UserList />
      </Container>
    </div>
  )
}

export default Tools;