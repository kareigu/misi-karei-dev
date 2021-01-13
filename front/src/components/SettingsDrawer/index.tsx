import React from 'react';
import './SettingsDrawer.css';

import { TextField, Chip, IconButton, Snackbar } from '@material-ui/core';
import { History, Done } from '@material-ui/icons';
import { IRawHomeContent } from '../Tools';
import { useState } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import paths from '../../utils/paths.json';
import parseAccessToken from '../../utils/parseAccessToken';
const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

interface IProps {
  content: Array<IRawHomeContent>,
  updateFn: React.Dispatch<React.SetStateAction<IRawHomeContent[] | undefined>>
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function SettingsDrawer(props: IProps) {

  const [dailyQuotes, setDailyQuotes] = useState(props.content[0].value);
  const [dailyNiilo, setDailyNiilo] = useState(props.content[1].value);
  const [latestStream, setLatestStream] = useState(props.content[2].value);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Empty alert');

  const handleSubmit = () => {
    const fieldsToSend: Array<IRawHomeContent> = [];

    if(dailyQuotes !== props.content[0].value)
      fieldsToSend.push({
        type: 'dailyQuotes', 
        value: typeof dailyQuotes === 'number' ? dailyQuotes : parseInt(dailyQuotes)
      });
    if(dailyNiilo !== props.content[1].value)
      fieldsToSend.push({
        type: 'dailyNiilo', 
        value: typeof dailyNiilo === 'number' ? dailyNiilo : parseInt(dailyNiilo)
      });
    if(latestStream !== props.content[2].value)
      fieldsToSend.push({type: 'latestStream', value: latestStream});

    if(fieldsToSend.length >= 1) {
      fetch(`${reqPath}home/content`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': parseAccessToken()
        },
        body: JSON.stringify(fieldsToSend)
      })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if(!json.message) {
          props.updateFn(json);
          setAlertMessage('Updated home settings');
          setAlertOpen(true);
        } else {
          setAlertMessage(json.message);
          setAlertOpen(true);
        }
      });
    } else {
      console.log('No changes made');
      setAlertMessage('Make changes before submitting');
      setAlertOpen(true);
    }
  }

  const createTextField = (
    label: string, 
    value: string | number, 
    updateFn: React.Dispatch<React.SetStateAction<string | number>>,
    index: number
    ) => {
    return (
    <>
      <br/>
      <TextField
        className="settingsTextField"
        label={label}
        value={value}
        onChange={e => updateFn(e.currentTarget.value)}
      />
      <IconButton
        color="secondary"
        onClick={() => updateFn(props.content[index].value)}
      >
        <History />
      </IconButton>
    </>
    )
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };


  return (
    <div className="settingsDrawer">
      <h2>Settings</h2>

      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          {alertMessage}
        </Alert>
      </Snackbar>

      <div className="homePageSettings">
        <Chip label="Home settings" color="primary" />
        
        <div className="homeOptions">
          {createTextField('Päivän quote', dailyQuotes, setDailyQuotes, 0)}
          {createTextField('Päivän niilo', dailyNiilo, setDailyNiilo, 1)}
          {createTextField('Uusin striimi', latestStream, setLatestStream, 2)}
        </div>

        <IconButton
          onClick={handleSubmit}
        >
          <Done color="primary" />
        </IconButton>

      </div>

    </div>
  )
}

export default SettingsDrawer;