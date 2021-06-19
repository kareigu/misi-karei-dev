import React, { useEffect, useState, useContext } from 'react';
import paths from '../../utils/paths.json';
import UserContext from '../../utils/UserContext';
import {Tooltip, IconButton, Button, TextField} from '@material-ui/core'
import {DeleteOutlined, Add} from '@material-ui/icons'
import parseAccessToken from '../../utils/parseAccessToken';

import './Saana.css'

interface INick {
  _id: string,
  nick: string
}

const URL = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

function Saana() {
  const [nicks, setNicks] = useState<INick[]>([]);
  const [newNick, setNewNick] = useState('');
  const [refresh, setRefresh] = useState(false);
  const {user} = useContext(UserContext);

  useEffect(() => {
    fetch(`${URL}/tools/saana`)
      .then(res => res.json())
      .then(json => setNicks(json));
  }, [refresh]);

  const addNick = () => {
    if(newNick.length > 1) {
      fetch(`${URL}/tools/saana`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': parseAccessToken()
        },
        body: JSON.stringify({nick: newNick})
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          setRefresh(!refresh);
        })
    }
  }

  const rmNick = (id: string) => {
    fetch(`${URL}/tools/saana`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': parseAccessToken()
      },
      body: JSON.stringify({id})
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setRefresh(!refresh);
      })
  }

  return (
    <div>
      { user.permLevel >= 3 &&
      <div className="add-controls">
        <TextField
          id="custom-css-standard-input"
          label="New Nick"
          className="addQuoteField"
          inputProps={{ 'aria-label': 'naked' }}
          value={newNick}
          onChange={e => setNewNick(e.currentTarget.value)}
        >
        </TextField>

        <Button
          style={{marginLeft: '28px'}}
          className="addQuoteButtons"
          size="small"
          variant="contained"
          color="primary"
          onClick={addNick}
        >
          <Add /> Add
        </Button>
      </div>
      }

      <div className="saana-page">
      { nicks &&
        nicks.map(e => (
          <div className="saana-nick" id={e._id}>
            <p>{e.nick}</p>
            { user.permLevel >= 3 &&
              <Tooltip title="Delete">
               <IconButton 
                color="secondary" 
                onClick={() => rmNick(e._id)} 
                id="removeButton" 
                className="adminButtons">
                  <DeleteOutlined />
                </IconButton>
              </Tooltip>
            }
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default Saana;