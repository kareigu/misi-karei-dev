import React from 'react';
import './Quotes.css'
import usePostQuoteService from '../../utils/getData';

function Quotes() {
  const service = usePostQuoteService();
  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' &&
        service.payload.map(quote => (
          <div key={quote.number}>#{quote.number} - {quote.text}</div>
        ))}
      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
  );
}

export default Quotes;