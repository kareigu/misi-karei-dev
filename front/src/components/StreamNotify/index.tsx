import React, { useState } from 'react';
import paths from '../../utils/paths.json';

import NavButton from '../NavButtons';

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
        setFetching(false);
        console.log(json);
      });
  }

  return (
    <div>
      <label>Select channel: </label>
      <NavButton 
        text={channel.toUpperCase()}
        onClick={() => setChannel(channel === 'ahha' ? 'botspam' : 'ahha')}
      />
      <h1>Send stream notification</h1>

      <NavButton 
        text="Striimi live!"
        onClick={handleSubmit}
        active={fetching}
      />

      <h2>{ status }</h2>
    </div>
  )
}

export default StreamNotify;