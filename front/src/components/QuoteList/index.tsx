import React, {useContext, useEffect, useState} from 'react';
import './QuoteList.css'
import GetFullQuoteList from '../../utils/getData';
import QuoteBlock from '../QuoteBlock';
import PageSwitcher from '../PageSwitcher';
import paths from '../../utils/paths.json';


import { ReactComponent as LoadingIcon } from '../../utils/loading2.svg';
import { Button, TextField } from '@material-ui/core';
import { CloudDownload, Add, Close } from '@material-ui/icons';
import UserContext from '../../utils/UserContext';

interface props {
  source: 'quotes' | 'niilo'
}

const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;


function QuoteList(props: props) {

  const service = GetFullQuoteList(props.source);
  const [list, setList] = useState<Array<JSX.Element>>();
  //const [searchTerm, setSearchTerm] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const [finalPage, setFinalPage] = useState(1);
  const [addingContent, setAddingContent] = useState(false);
  const [contentToAdd, setContentToAdd] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    let tempArr: Array<JSX.Element> = [];
    if(service.status === 'loaded') {
      setFinalPage(Math.round(service.payload.length / 51) + 1);

      for (let i = (pageCount - 1) * 51; i < pageCount * 51; i++) {
        if(service.payload[i]){
          const quote = service.payload[i];
          tempArr.push(
            <QuoteBlock 
              key={quote._id} 
              text={quote.text} 
              number={quote.number}
              origin={props.source}
            />
          )
        } else {
          break;
        }
      }
    }
    
    setList(tempArr);
  }, [service, pageCount, props.source]);

  return (
    <div>
      { service.status === 'loaded' &&
      <>
        <div 
          style={{
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '15px 0px'
          }}
        >
        { user.permLevel >= 3 &&
        <>
        { !addingContent &&
          <Button
            style={{left: '15px'}}
            variant="contained"
            color="secondary"
            onClick={() => setAddingContent(true)}
          >
            <Add /> Add {props.source === 'quotes' ? 'Quote' : 'Niilo'}
          </Button>
        }

        { addingContent &&
        <>
          <TextField
            id="custom-css-standard-input"
            label={props.source === 'quotes' ? 'quote' : props.source}
            style={{left: '25px', width: '400px', height: '25px', bottom: '10px'}}
            inputProps={{ 'aria-label': 'naked' }}
            value={contentToAdd}
            onChange={e => setContentToAdd(e.currentTarget.value)}
          >
          </TextField>

          <Button
            style={{marginLeft: '28px'}}
            size="small"
            variant="contained"
            color="primary"
            onClick={() => setAddingContent(false)}
          >
            <Add /> Add
          </Button>

          <Button
            style={{marginLeft: '5px'}}
            size="small"
            variant="contained"
            color="default"
            onClick={() => setAddingContent(false)}
          >
            <Close /> Cancel
          </Button>
        </>
        }
          
        </>
        }
        <Button
          style={{marginLeft: 'auto', marginRight: '15px'}}
          variant="contained"
          color="primary"
          onClick={() => window.location.href = `${reqPath}${props.source}/backup`}
        >
          <CloudDownload /> &nbsp; Download {props.source}
        </Button>
        </div>
        <PageSwitcher pageCount={pageCount} finalPage={finalPage} setPageCount={setPageCount} />
      </>
      }
      
      <div className="quotelist-container">
        {service.status === 'loading' && <LoadingIcon style={{marginTop: '150px'}} />}
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