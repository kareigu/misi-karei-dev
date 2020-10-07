import { useEffect, useState } from 'react';
import { Service } from './types/Service';
import { Quote } from './types/Quote';

export interface Quotes {
  results: Quote[];
}

const usePostQuoteService = () => {
  const [result, setResult] = useState<Service<Quote[]>>({
    status: 'loading'
  });

  useEffect(() => {
    fetch("https://localhost:6020/api/v1/quotes?fullList=true")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setResult({ status: 'loaded', payload: res})
      })
      .catch(err => setResult({ status: 'error', error: err}));
  }, []);
  return result;
}

export default usePostQuoteService;