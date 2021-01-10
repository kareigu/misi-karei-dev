import React, { useEffect, useState } from 'react';
import { UserInfo } from '../../utils/types/UserInfo';

import paths from '../../utils/paths.json';
import LoadingComponent from '../LoadingComponent';
import { Container, Avatar, Card, CardContent, makeStyles, Typography } from '@material-ui/core'

type props = {
  path: 'login' | 'signout'
}

type loginResponse = {
  status: {
    code: 'success' | 'failed',
    message: string
  },
  userData?: {
    id: string,
    username: string,
    avatar: string,
    access_token: string
  }
}

const useStyles = makeStyles({
  root: {
    marginTop: '50px',
    minWidth: 275,
    color: 'white',
    backgroundColor: '#1e2229',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

function Login(props: props) {

  const classes = useStyles();


  useEffect(() => {
    if(props.path === 'login') {
      const code = window.location.search;
  
      fetch(`${reqPath}OAuth${code}`)
        .then(res => res.json())
        .then((json: loginResponse) => {
          if(json.status.code === 'success') {
            if(json.userData) {
              const { userData } = json;
              localStorage.setItem('userData', JSON.stringify(userData));
              setUserInfo({
                username: userData.username,
                avatar: userData.avatar
              });
              setLoading(false);

              setTimeout(() => {
                window.location.href = '/';
              }, 1000);
            }
          } else {
            setUserInfo({
              username: 'Error',
              avatar: 'https://mxrr.dev/files/lmao.gif'
            })
            console.warn(json.status);
            setLoading(false);
          }
          
        });
    } else {
      localStorage.removeItem('userData');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  }, [props.path]);

  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [loading, setLoading] = useState(true);

  return (
    <Container style={{color: 'white'}}>
      {
        props.path === 'login' &&
        <Container maxWidth="xs">
          { loading &&
            <LoadingComponent margin="100px" />
          }
          { userInfo &&
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title}>Logged in as</Typography>
                <Typography className={classes.pos}>
                  <Avatar
                   src={userInfo.avatar}
                   alt={userInfo.username} 
                   style={{top: '30px', left: '50px'}}
                  /> 
                  {userInfo.username}
                </Typography>
              </CardContent>
            </Card>
          }
        </Container>
      }

      {
        props.path === 'signout' &&
        <div>
          <h1>Signed out</h1>
        </div>
      }
      
    </Container>
  );
}

export default Login;