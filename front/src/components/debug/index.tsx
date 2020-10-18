import React, { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

function Debug() {
  const [backup, setBackup] = useState('');

  const handleChange = (event: ChangeEvent) => {
    setBackup((event.target as HTMLTextAreaElement).value)
  }

  const handleSubmit = (event: FormEvent) => {
    const data = {
      text: backup
    }

    fetch('https://localhost:6020/api/v1/niilo/backup',
    {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'asdasda'
      },
      body: JSON.stringify(data)
    })
    .then(res => console.log(res));


    event.preventDefault();
  }


  return (
    <div>
      <h1>Debug</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          Backup:
          <textarea value={backup} onChange={e => handleChange(e)} name="backup" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Debug;