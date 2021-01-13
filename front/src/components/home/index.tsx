import React from 'react';
import './Home.css';
import { Badge, Grid, Card, CardContent, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import LoadingComponent from '../LoadingComponent';

import paths from '../../utils/paths.json';
const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

interface IHomeContent {
  [key: string]: {
    _id: string,
    text: string,
    number: number
  }
}


function Home() {
  const [homeContent, setHomeContent] = useState<IHomeContent>();

  useEffect(() => {
    fetch(`${reqPath}home/content`)
      .then(res => res.json())
      .then(json => setHomeContent(json));
  }, []);

  return (
    <div id="homeComponent">
      { !homeContent &&
        <LoadingComponent margin="150px" />
      }
      
      { homeContent &&
        <Grid container spacing={2} className="homeContainer">
          <Grid item xs={window.innerWidth < 640 ? 12 : 6}>
              <Card className="contentCard">
                <CardContent className="cardContent">
                  <Typography className="cardTitle">
                    <Badge badgeContent={homeContent.dailyQuotes.number} max={9999} color="primary">
                      Päivän quote &nbsp; &nbsp; &nbsp;
                    </Badge>
                  </Typography>
                  <Typography>
                    {homeContent.dailyQuotes.text}
                  </Typography>
                </CardContent>
            </Card>
          </Grid>

          <Grid item xs={window.innerWidth < 640 ? 12 : 6}>
            <Card className="contentCard">
              <CardContent className="cardContent">
                <Typography className="cardTitle">
                  <Badge badgeContent={homeContent.dailyNiilo.number} max={9999} color="secondary">
                    Päivän niilo &nbsp; &nbsp; &nbsp;
                  </Badge>
                </Typography>
                <Typography>
                  {homeContent.dailyNiilo.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      }
      
    </div>
  );
}

export default Home;