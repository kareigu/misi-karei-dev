import React from 'react';
import './Niilo.css';
import QuoteList from '../QuoteList';

interface Props {
  permLevel: number
}

function Niilo(props: Props) {
  return (
    <QuoteList source="niilo" permLevel={props.permLevel} />
  );
}

export default Niilo;