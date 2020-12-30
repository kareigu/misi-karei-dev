import React, { useState } from 'react';
import paths from '../../utils/paths.json';

const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

type channel = 'ahha' | 'botspam';
type response = {
  msg: string
}

function StreamNotify() {
  const [channel, setChannel] = useState<channel>('ahha');
  const [status, setStatus] = useState('');

  function handleSubmit() {
    setStatus('Fetching YouTube API');
    const token = localStorage.getItem('token');
    fetch(`${reqPath}tools/notify`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, hook: channel })
      })
      .then(res => res.json())
      .then((json: response) => {
        setStatus(json.msg);
        console.log(json);
      });
  }

  return (
    <div>
      <label>Select channel </label>
      <button 
        onClick={() => setChannel(channel === 'ahha' ? 'botspam' : 'ahha')}
      >
        {channel.toUpperCase()}
      </button>
      <h1>Send stream notification</h1>

      <button onClick={handleSubmit}>Striimi live!</button>

      { status !== '' &&
        <h2>{ status }</h2>
      }
    </div>
  )
}

export default StreamNotify;