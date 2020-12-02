import React from 'react';
import './Niilo.css';
import GetFullQuoteList from '../../utils/getData';
import QuoteBlock from '../QuoteBlock';

function Niilo() {
  const service = GetFullQuoteList('niilo');
  return (
    <div className="quotelist-container">
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' &&
        service.payload.map(quote => (
          <QuoteBlock 
            key={quote._id} 
            text={quote.text} 
            number={quote.number}
            usertype="normal"
          />
        ))}
      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
  );
}

export default Niilo;