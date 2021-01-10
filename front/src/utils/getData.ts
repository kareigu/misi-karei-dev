import { useEffect, useState } from 'react';
import { Service } from './types/Service';
import { Quote, Source } from './types/Quote';
import paths from './paths.json';

const GetFullQuoteList = (source: Source, refresh: boolean) => {
  const [result, setResult] = useState<Service<Quote[]>>({
    status: 'loading'
  });

  const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

  useEffect(() => {
    fetch(`${reqPath}${source}?fullList=true`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setResult({ status: 'loaded', payload: res})
      })
      .catch(err => setResult({ status: 'error', error: err}));
  }, [reqPath, source, refresh]);
  return result;
}

export default GetFullQuoteList;