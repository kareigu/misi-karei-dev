import React, { useEffect, useState, useContext } from 'react';

import parseAccessToken from '../../utils/parseAccessToken';
import getPermissionName from '../../utils/getPermissionName';

import { ReactComponent as LoadingIcon } from '../../utils/loading2.svg';
import { ArrowUpward, Security, ChildCare, Group, Lens } from '@material-ui/icons'

import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Avatar, Chip } from '@material-ui/core';

import './UserList.css'
import paths from '../../utils/paths.json';
import UserContext from '../../utils/UserContext';
const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

type TUserList = [
  {
    id: string,
    username: string,
    avatar: string,
    permissionLevel: number
  }
]

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#09131c',
      color: 'white',
    },
    body: {
      fontSize: 14,
      color: 'white',
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#060d14',
      },
      '&:nth-of-type(even)': {
        backgroundColor: '#14212e',
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const getPermColour = (n: number) => {
  if(n < 3)
    return 'default'
  if(n < 4)
    return 'primary'
  if(n >= 4)
    return 'secondary'
}

const getPermIcon = (n: number) => {
  if(n < 3)
    return <Lens />
  if(n < 4)
    return <Group />
  if(n < 5)
    return <Security />
  if(n >= 5)
    return <ChildCare />
}


function UserList() {

  const [userList, setUserlist] = useState<TUserList>()
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Loaded user list');
  const [updateList, setUpdateList] = useState(true);
  const {user} = useContext(UserContext);

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
          <StyledTableRow key={el.id} className="animate">
            <StyledTableCell><Avatar src={el.avatar} alt={el.username} /></StyledTableCell>
            <StyledTableCell>{el.username}</StyledTableCell>
            <StyledTableCell>
              <Chip 
                icon={ getPermIcon(el.permissionLevel) }
                color={ getPermColour(el.permissionLevel) }
                label={ getPermissionName(el.permissionLevel) }
              />
            </StyledTableCell>

            { user.permLevel >= 5 &&
              <StyledTableCell>
                { el.permissionLevel >= 5 &&
                  <p>Already at max</p>
                }
                { el.permissionLevel < 5 &&
                  <Chip 
                    icon={ <ArrowUpward /> }
                    clickable
                    color={ getPermColour(el.permissionLevel + 1) }
                    label={`To ${getPermissionName(el.permissionLevel + 1)}`}
                    onClick={() => upgradePermissions(el.permissionLevel + 1, el.id)}
                  />
                }  
              </StyledTableCell>
            }
            
          </StyledTableRow>
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
      });
  }, [updateList]);

  const classes = useStyles();

  return(
    <div>
      <h1>User List</h1>

      { loading &&
        <LoadingIcon 
          style={{
            marginBottom: '100px',
            marginTop: '100px'
          }}
        />
      }

      { !loading &&
      <>
        <Chip 
          label={status}
          color="secondary"
        />

        <TableContainer 
          component={Paper}
          style={{marginTop: '20px'}}
          className="animate"
        >
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Avatar</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Permission Level</StyledTableCell>
                { user.permLevel >= 5 &&
                  <StyledTableCell>Promote</StyledTableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              { userList &&
                renderUserList()
              }
            </TableBody>
          </Table>
          <p>
            
          </p>
        </TableContainer>
      </>
      }
    </div>
  )
}

export default UserList;