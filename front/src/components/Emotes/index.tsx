import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container, Tooltip } from '@material-ui/core';

interface EmoteList {
  [key: string]: string
}

const useStyles = makeStyles({
  table: {
    minWidth: 390,
    maxWidth: 390,
  },
  header: {
    backgroundColor: '#14211d',
    color: 'white'
  },
  emoteCells: {
    backgroundColor: '#13241f',
    color: 'white'
  },
  imgCells: {
    backgroundColor: '#1e3d34'
  }
});

function Emotes() {

  const classes = useStyles();

  const [contents, setContents] = useState<EmoteList>();
  const [loading, setLoading] = useState(true);

  const copyText = (code: string) => {
    const temp = document.createElement('textarea');
    document.body.appendChild(temp);
    temp.value = code;
    temp.select();
    temp.setSelectionRange(0, 9999999);
    document.execCommand('copy');
    document.body.removeChild(temp);
  }

  function renderTable() {

    if(contents !== undefined) {
      const baseUrl = `https://raw.githubusercontent.com/mxrr/BetterYTG/master/src/assets/emotes/images/`;
      const keys = Object.keys(contents).sort();
      return(
        keys.map(key => (
          <TableRow  key={key} >
            <TableCell 
              className={classes.emoteCells}
              onClick={(e) => copyText(e.currentTarget.innerText)}
            >
              {key}
            </TableCell >
            <TableCell className={classes.imgCells}><img src={`${baseUrl}${contents[key]}`} alt={key}/></TableCell >
          </TableRow >
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
  }, [])

  return (
    <div style={{color:'white'}}>
      <h1>Emotes</h1>
      { loading &&
        <h2>Loading...</h2>
      }

      { !loading &&
        <Container maxWidth="xs">
          <TableContainer component={Paper} className={classes.header}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.header}>
                <TableRow>
                  <TableCell className={classes.header}>Emote (click to copy) </TableCell>
                  <TableCell className={classes.header}>Image</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.imgCells}>
                { renderTable() }
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      }
    </div>
  )
}

export default Emotes;