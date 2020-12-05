import React from 'react';
import './PageSwitcher.css';

interface props {
  pageCount: number,
  setPageCount: Function,
  finalPage: number,
}

function PageSwitcher(props: props) {
  const {pageCount, finalPage, setPageCount} = props;

  function prevPage() {
    if(pageCount - 1 > 0)
      setPageCount(pageCount - 1)
  }

  function nextPage() {
    if(pageCount + 1 <= finalPage)
      setPageCount(pageCount + 1)
  }

  return (
    <div className="pageControls">
      <button onClick={prevPage}>{'<'}</button>
      <span className="pageCounter">{`${pageCount}/${finalPage}`}</span>
      <button onClick={nextPage}>{'>'}</button>
    </div>
  )
}

export default PageSwitcher;