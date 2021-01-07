import React, { useEffect, useState } from 'react';

import parseAccessToken from '../../utils/parseAccessToken';
import getPermissionName from '../../utils/getPermissionName';

import paths from '../../utils/paths.json';
const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

type UserList = [
  {
    id: string,
    username: string,
    avatar: string,
    permissionLevel: number
  }
]

interface Props {
  permLevel: number
}

function UserList(props: Props) {

  const [userList, setUserlist] = useState<UserList>()
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('loading');
  const [updateList, setUpdateList] = useState(true);

  const renderUserList = () => {


    const upgradePermissions = (n: number, id: string) => {
      
      const token = parseAccessToken();

      setStatus('Promoting')

      fetch(`${reqPath}login/users`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify([
          {
            id,
            permissionLevel: n
          }
        ])
      })
      .then(res => res.json())
      .then(json => {
        setStatus(json[0]);
        setUpdateList(!updateList);
      });
    }


    if(userList !== undefined) {
      return(
        userList.map(el => (
          <tr key={el.id}>
            <td><img src={el.avatar} alt={el.id} width="50%" height="50%" /></td>
            <td>{el.username}</td>
            <td>{getPermissionName(el.permissionLevel)}</td>
            { props.permLevel >= 5 &&
              el.permissionLevel < 5 &&
                <td
                  onClick={() => upgradePermissions(el.permissionLevel + 1, el.id)}
                >
                  To {getPermissionName(el.permissionLevel + 1)}
                </td>
            }
            
          </tr>
        ))
      )
    } else {
      return(
        <p>
          Empty list
        </p>
      )
    }
  }

  useEffect(() => {
    fetch(`${reqPath}login/users`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setUserlist(json);

        if(loading) {
          setLoading(false);
          setStatus('Loaded user list');
        }
          
      });
  }, [updateList]);

  return(
    <div>
      <h1>User List</h1>

      <h4>{status}</h4>

      { !loading &&
        <div>
          <table style={{
          margin: 'auto'
          }}>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Permission Level</th>
                { props.permLevel >= 5 &&
                  <th>Promote</th>
                }
              </tr>
            </thead>
            <tbody>
              { userList &&
                renderUserList()
              }
            </tbody>
          </table>
          <p>
            
          </p>
        </div>
      }
    </div>
  )
}

export default UserList;