import React, {useState} from 'react'
import paths from '../../utils/paths.json';

import { Button, TextField } from '@material-ui/core';
import parseAccessToken from '../../utils/parseAccessToken';

const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

type channel = 'ahha' | 'botspam';
type response = {
  msg: string
}

function Announce() {
  const [channel, setChannel] = useState<channel>('ahha');
  const [pre, setPre] = useState(false);
  const [message, setMessage] = useState('');

  function handleSubmit() {
    fetch(`${reqPath}tools/announce`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': parseAccessToken()
        },
        body: JSON.stringify({ 
          hook: channel, 
          pre,
          message 
        })
      })
      .then(res => res.json())
      .then((json: response) => {
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
      <Button 
        variant="contained"
        color={ pre ? 'secondary' : 'primary'}
        onClick={() => setPre(!pre)}
      >
        { pre ? 'Preformatted' : 'Raw message' }
      </Button>
      <h1>Post Announcement</h1>

      <TextField 
        multiline
        value={message}
        onChange={e => setMessage(e.currentTarget.value)}
        fullWidth
      >
      </TextField>

      <br/>
      <Button 
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Post
      </Button>

      <br/>
    </div>
  )
}

export default Announce;