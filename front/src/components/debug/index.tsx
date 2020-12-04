import React, { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import paths from '../../utils/paths.json'

function Debug() {
  const [backup, setBackup] = useState('');
  const [selectedDB, setSelectedDB] = useState('quotes');

  function switchDB() {
    if(selectedDB === 'quotes')
      setSelectedDB('niilo');
    else
      setSelectedDB('quotes');
  }

  const handleChange = (event: ChangeEvent) => {
    setBackup((event.target as HTMLTextAreaElement).value)
  }

  const handleSubmit = (event: FormEvent) => {
    const data = {
      text: backup
    }

    fetch(`${process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath}${selectedDB}/backup`,
    {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token') || 'invalid'}`
      },
      body: JSON.stringify(data)
    })
    .then(res => console.log(res));


    event.preventDefault();
  }


  return (
    <div>
      <h1>Debug</h1>
      <button onClick={switchDB}>
        {selectedDB}
      </button>

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