import React, { useState, Suspense, useEffect } from 'react';

import NavButton from '../NavButtons';

import './misc.css'

type LocHash = 'timeout' | 'saana' | 'emotes';

const convertToValidHash = (): LocHash => {
  switch (window.location.hash) {
    case '#saana':
      return 'saana'

    case '#emotes':
      return 'emotes'
  
    default:
      return 'timeout'
  }
}

const Timeout = React.lazy(() => import('../timeout'));
const Emotes = React.lazy(() => import('../Emotes'));

function Misc() {

  
  
  const [active, setActive] = useState<LocHash>('timeout');


  useEffect(() => {
    setActive(convertToValidHash());
  }, [active])

  return(
    <div>
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
          </ul>
        </nav>
      </header>

      <div>
        <Suspense fallback={<div><h2>Loading...</h2></div>}>
          {active === 'timeout' &&
            <Timeout />
          }

          {active === 'emotes' &&
            <Emotes />
          }
        </Suspense>
      </div>
      
    </div>
  )
}

export default Misc;