import React, { useEffect, useState } from 'react';

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

function UserList() {

  const [userList, setUserlist] = useState<UserList>()
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('loading');

  const renderUserList = () => {


    const upgradePermissions = (n: number, id: string) => {
      const storage = localStorage.getItem('userData');

      let token = '';

      if(storage !== null)
        token = JSON.parse(storage).access_token;

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
      .then(json => setStatus(json[0]));
    }

    const getPermissionName = (n: number) => {
      switch (n) {
        case 5:
          return 'Admin'

        case 4:
          return 'Moderator'

        case 3:
          return 'VIP'
      
        default:
          return 'Normal user'
      }
    }

    if(userList !== undefined) {
      return(
        userList.map(el => (
          <tr key={el.id}>
            <td><img src={el.avatar} alt={el.id} width="50%" height="50%" /></td>
            <td>{el.username}</td>
            <td>{getPermissionName(el.permissionLevel)}</td>
            { el.permissionLevel < 5 &&
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
        setLoading(false);
        setStatus('Loaded user list');
      });
  }, []);

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
                <th>Promote</th>
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