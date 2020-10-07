import React from 'react';
import './QuoteBlock.css';

type values = {
  text: string,
  number: number
}

function QuoteBlock(props: values) {
  return (
    <div className="container">
      <h2 id="number">#{props.number}</h2>
      <h4 id="quoteText">{props.text}</h4>
    </div>
  );
}

export default QuoteBlock;