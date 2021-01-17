import React from 'react';
import './Home.css';
import { Badge, Grid, Card, CardContent, Typography, Container, Chip } from '@material-ui/core';
import { useState, useEffect } from 'react';
import LoadingComponent from '../LoadingComponent';
import YouTube from 'react-youtube';
import { VoiceChat } from '@material-ui/icons';

import paths from '../../utils/paths.json';
const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

export interface IDailyContent {
  _id: string,
  text: string,
  number: number
}

export interface IHomeContent {
  dailyQuotes: IDailyContent,
  dailyNiilo: IDailyContent,
  latestStream: string
}


function Home() {
  const [homeContent, setHomeContent] = useState<IHomeContent>();

  useEffect(() => {
    fetch(`${reqPath}home/content`)
      .then(res => res.json())
      .then(json => setHomeContent(json));
  }, []);

  const YTOptions = {
    width: window.innerWidth < 768 ? (window.innerWidth - 120).toString() : '768',
    height: window.innerWidth < 768 ? (window.innerWidth / 2.5).toString() : '380'
  }

  return (
    <div id="homeComponent">
      { !homeContent &&
        <LoadingComponent margin="150px" />
      }
      
      { homeContent &&
        <Grid container spacing={2} className="homeContainer">

          <Grid item xs={12}>
            <Container maxWidth="md">
              <Card id="latestStreamCard" className="contentCard">
                <CardContent className="cardContent">
                  <Typography style={{marginBottom: '10px'}} className="cardTitle">
                    <Chip 
                      label="Viimeisin striimi" 
                      color="primary" 
                      icon={<VoiceChat />}
                    />
                  </Typography>
                  <YouTube 
                    videoId={homeContent.latestStream} 
                    className="latestStreamContainer" 
                    opts={YTOptions}
                  />
                </CardContent>
              </Card>
            </Container>
          </Grid>

          <Grid item xs={12} sm={6}>
              <Card className="contentCard">
                <CardContent className="cardContent">
                  <Typography className="cardTitle">
                    <Badge 
                      badgeContent={homeContent.dailyQuotes.number} 
                      max={9999}
                      color="primary"
                    >
                      Päivän quote &nbsp; &nbsp; &nbsp;
                    </Badge>
                  </Typography>
                  <Typography>
                    {homeContent.dailyQuotes.text}
                  </Typography>
                </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card className="contentCard">
              <CardContent className="cardContent">
                <Typography className="cardTitle">
                  <Badge 
                    badgeContent={homeContent.dailyNiilo.number} 
                    max={9999} 
                    color="secondary"
                  >
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