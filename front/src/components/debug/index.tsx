import React, { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import paths from '../../utils/paths.json'
import parseAccessToken from '../../utils/parseAccessToken';
import { useContext } from 'react';
import UserContext from '../../utils/UserContext';

function Debug() {
  const [backup, setBackup] = useState('');
  const [selectedDB, setSelectedDB] = useState('quotes');
  const {user} = useContext(UserContext);

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
        'Authorization': `${parseAccessToken()}`
      },
      body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(text => console.log(text));


    event.preventDefault();
  }


  return (
    <div style={{color: 'white'}}>
      { user.permLevel < 5 &&
        <h1>Painutkos vittuun täältä</h1>
      }

      { user.permLevel >= 5 &&
      <>
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
      </>
      }
    </div>
  );
}

export default Debug;