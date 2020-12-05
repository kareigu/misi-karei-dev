import React, {useEffect, useState} from 'react';
import './Quotes.css'
import GetFullQuoteList from '../../utils/getData';
import QuoteBlock from '../QuoteBlock';


function Quotes() {
  const service = GetFullQuoteList('quotes');
  const [list, setList] = useState<Array<JSX.Element>>();
  const [searchTerm, setSearchTerm] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const [finalPage, setFinalPage] = useState(1);

  useEffect(() => {
    let tempArr: Array<JSX.Element> = [];
    if(service.status === 'loaded') {
      setFinalPage(Math.round(service.payload.length / 51 + 1));

      for (let i = (pageCount - 1) * 51; i < pageCount * 51; i++) {
        if(service.payload[i]){
          const quote = service.payload[i];
          tempArr.push(
            <QuoteBlock 
              key={quote._id} 
              text={quote.text} 
              number={quote.number}
              usertype="admin"
              origin="quotes"
            />
          )
        } else {
          break;
        }
      }
    }

    /* if(sortSettings.orientation === 'descending')
      tempArr = tempArr.reverse(); */

    setList(tempArr);
  }, [service, searchTerm, pageCount]);

  function prevPage() {
    if(pageCount - 1 > 0)
      setPageCount(pageCount - 1)
  }

  function nextPage() {
    if(pageCount + 1 <= finalPage)
      setPageCount(pageCount + 1)
  }

  return (
    <div>
      <button onClick={prevPage}>{'<'}</button>
      <span>{`${pageCount}/${finalPage}`}</span>
      <button onClick={nextPage}>{'>'}</button>
      <div className="quotelist-container">
        {service.status === 'loading' && <div>Loading...</div>}
        {service.status === 'loaded' &&
          list ? 
            list.map(quoteblock => (
              quoteblock
            ))
            : ''
        }
        {service.status === 'error' && (
          <div>Error, the backend moved to the dark side.</div>
        )}
      </div>
    </div>
  );
}

export default Quotes;