import React, { useState } from 'react';

import NavButton from '../NavButtons';
import Timeout from '../timeout';

import './misc.css'


function Misc() {

  const [active, setActive] = useState('timeout');

  return(
    <div>
      <header className="Misc-header">
        <nav>
          <ul>
            <NavButton 
              text="Timeout/Ban" 
              active={active === 'timeout' ? true : false}
              onClick={() => setActive('timeout')}
            />

            <NavButton 
              text="Saanan nickit" 
              active={active === 'saana' ? true : false}
              onClick={() => setActive('saana')}
            />
          </ul>
        </nav>
      </header>

      <div>
        {active === 'timeout' &&
          <Timeout />
        }
      </div>
      
    </div>
  )
}

export default Misc;