import React, { useMemo, useEffect, useState } from 'react';
import { Chart } from 'react-charts';

import test from './test.json';
import paths from '../../utils/paths.json';

const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

type arrContents = [string, number]

type ResponseType = [
  {
    name: string,
    timeouts: number,
    bans: number
  }
]

type DataType = {
  label: string,
  data: arrContents[]
}

function Timeout() {

  const [stats, setStats] = useState<DataType[]>();

  useEffect(() => {
    fetch(`${reqPath}tools/timeout`)
      .then(res => res.json())
      .then((json: ResponseType) => {
        const timeouts: DataType = {
          label: 'Timeouts',
          data: new Array<arrContents>()
        }
      
        const bans: DataType = {
          label: 'Bans',
          data: new Array<arrContents>()
        }
      
        json.forEach(el => {
          timeouts.data.push([el.name, el.timeouts]);
          bans.data.push([el.name, el.bans]);
        })
    
        setStats([timeouts, bans]);
      });
  }, []);
  
  return (
    <div
      style={{
        position: 'relative',
        display: 'grid',
        top: '50px',
        margin: 'auto',
        width: '800px',
        height: '400px',
      }}
    >
      { !stats &&
        <h1>Loading...</h1>
      }

      { stats &&
        <Chart 
          data={stats} 
          series={{type: 'bar'}} 
          axes={[
            { primary: true, type: 'ordinal', position: 'bottom' },
            { type: 'linear', position: 'left' }
          ]} 
          tooltip 
          dark
        />
      }
      
    </div>
  )
}

export default Timeout;