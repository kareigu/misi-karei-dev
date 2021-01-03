import React, { useEffect, useState } from 'react';

interface EmoteList {
  [key: string]: string
}

function Emotes() {

  const [contents, setContents] = useState<EmoteList>();
  const [loading, setLoading] = useState(true);

  function renderTable() {

    if(contents !== undefined) {
      const baseUrl = `https://raw.githubusercontent.com/mxrr/BetterYTG/master/src/assets/emotes/images/`;
      const keys = Object.keys(contents).sort();
      return(
        keys.map(key => (
          <tr key={key}>
            <td>{key}</td>
            <td><img src={`${baseUrl}${contents[key]}`} alt={key}/></td>
          </tr>
        ))
      )
    } else {
      return(
        <h1>Error fetching data</h1>
      )
    }
  }


  useEffect(() => {
    fetch('https://raw.githubusercontent.com/mxrr/BetterYTG/master/src/assets/emotes/dictionary.json')
      .then(res => res.json())
      .then(json => {
        setContents(json);
        setLoading(false);
      });
  })

  return (
    <div>
      <h1>Emotes</h1>
      { loading &&
        <h2>Loading...</h2>
      }

      { !loading &&
        <table style={{
          margin: 'auto'
        }}>
          <thead>
            <tr>
              <th>Emote</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            { renderTable() }
          </tbody>
        </table>
      }
    </div>
  )
}

export default Emotes;