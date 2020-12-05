import React, {useEffect, useState} from 'react';
import './QuoteList.css'
import GetFullQuoteList from '../../utils/getData';
import QuoteBlock from '../QuoteBlock';
import PageSwitcher from '../PageSwitcher';

interface props {
  source: 'quotes' | 'niilo'
}

function QuoteList(props: props) {
  const service = GetFullQuoteList(props.source);
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
              origin={props.source}
            />
          )
        } else {
          break;
        }
      }
    }
    
    setList(tempArr);
  }, [service, searchTerm, pageCount, props.source]);

  return (
    <div>
      { service.status === 'loaded' &&
        <PageSwitcher pageCount={pageCount} finalPage={finalPage} setPageCount={setPageCount} />
      }
      
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

export default QuoteList;