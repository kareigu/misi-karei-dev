import React, { useState } from 'react';
import paths from '../../utils/paths.json';

import { Button, Chip } from '@material-ui/core';

const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

type channel = 'ahha' | 'botspam';
type response = {
  msg: string
}

function StreamNotify() {
  const [channel, setChannel] = useState<channel>('ahha');
  const [status, setStatus] = useState('-');
  const [fetching, setFetching] = useState(false);

  function handleSubmit() {
    setStatus('Fetching YouTube API');
    setFetching(true);

    const storage = localStorage.getItem('userData');

    let token = '';

    if(storage !== null)
      token = JSON.parse(storage).access_token;
    
    fetch(`${reqPath}tools/notify`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ hook: channel })
      })
      .then(res => res.json())
      .then((json: response) => {
        setStatus(json.msg);
        setFetching(false);
        console.log(json);
      });
  }

  return (
    <div>
      <br/>
      <Button 
        variant="contained"
        color={ channel === 'ahha' ? 'secondary' : 'primary'}
        onClick={() => setChannel(channel === 'ahha' ? 'botspam' : 'ahha')}
      >
        { channel === 'ahha' ? '😂 AHHA ' : '🤖 BOTSPAM ' }
      </Button>
      <h1>Send stream notification</h1>

      <Button 
        variant={ fetching ? 'outlined' : 'contained' }
        color="primary"
        onClick={handleSubmit}
      >
        Striimi live!
      </Button>

      <br/>
      
      <div style={{marginTop: '20px', marginBottom: '10px'}}>
        <Chip
          color="primary"
          label={status}
        />
      </div>
      
    </div>
  )
}

export default StreamNotify;