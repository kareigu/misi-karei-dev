import React from 'react';
import { ReactComponent as LoadingIcon } from '../../utils/loading2.svg';
import './LoadingComponent.css';

type TProps = {
  margin: string
  bottom?: string
}

function LoadingComponent(props: TProps) {

  return (
    <LoadingIcon className="loadingIcon" style={{marginTop: props.margin, marginBottom: props.bottom}} />
  )
}

export default LoadingComponent;