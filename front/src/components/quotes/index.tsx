import React from 'react';
import './Quotes.css'
import QuoteList from '../QuoteList';

function Quotes() {
  return (
    <QuoteList source="quotes" />
  );
}

export default Quotes;