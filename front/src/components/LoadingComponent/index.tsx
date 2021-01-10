import React from 'react';
import { ReactComponent as LoadingIcon } from '../../utils/loading2.svg';
import './LoadingComponent.css';

function LoadingComponent() {

  return (
    <LoadingIcon className="loadingIcon" style={{marginTop: '150px'}} />
  )
}

export default LoadingComponent;