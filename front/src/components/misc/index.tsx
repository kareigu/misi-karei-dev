import React, { useState, Suspense, useEffect } from 'react';

import NavButton from '../NavButtons';
import LoadingComponent from '../LoadingComponent';

import './misc.css'

type LocHash = 
  'timeout' | 
  'saana' | 
  'emotes' | 
  'nappulat';

const convertToValidHash = (): LocHash => {
  switch (window.location.hash) {
    case '#saana':
      return 'saana'

    case '#emotes':
      return 'emotes'
    
    case '#nappulat':
      return 'nappulat'
  
    default:
      return 'timeout'
  }
}

const Timeout = React.lazy(() => import('../timeout'));
const Emotes = React.lazy(() => import('../Emotes'));
const Nappulat = React.lazy(() => import('../Nappulat'));

function Misc() {

  const [active, setActive] = useState<LocHash>('timeout');


  useEffect(() => {
    setActive(convertToValidHash());
  }, [active])

  return(
    <div style={{color: 'white'}}>
      <header className="Misc-header">
        <nav>
          <ul>
            <NavButton 
              text="Timeout/Ban" 
              active={active === 'timeout' ? true : false}
              onClick={() => {
                setActive('timeout');
                window.location.href = ('#timeout');
              }}
            />

            <NavButton 
              text="Saanan nickit" 
              active={active === 'saana' ? true : false}
              onClick={() => {
                setActive('saana');
                window.location.href = ('#saana');
              }}
            />

            <NavButton 
              text="Emotet" 
              active={active === 'emotes' ? true : false}
              onClick={() => {
                setActive('emotes');
                window.location.href = ('#emotes');
              }}
            />

            <NavButton 
              text="Mäkin nappulat" 
              active={active === 'nappulat' ? true : false}
              onClick={() => {
                setActive('nappulat');
                window.location.href = ('#nappulat');
              }}
            />
          </ul>
        </nav>
      </header>

      <div>
        <Suspense fallback={<LoadingComponent margin="150px" />}>
          {active === 'timeout' &&
            <Timeout />
          }

          {active === 'emotes' &&
            <Emotes />
          }
          
          {active === 'nappulat' &&
            <Nappulat />
          }

        </Suspense>
      </div>
      
    </div>
  )
}

export default Misc;