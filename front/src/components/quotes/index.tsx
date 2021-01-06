import React from 'react';
import './Quotes.css'
import QuoteList from '../QuoteList';

interface Props {
  permLevel: number
}

function Quotes(props: Props) {
  return (
    <QuoteList source="quotes" permLevel={props.permLevel} />
  );
}

export default Quotes;