import React from 'react';
import logo from '../../temp.gif';
import './404.css';


function LoadingComponent() {

  return (
    <div>
      <h1 id="title-text">
        404
      </h1>
      <img className="notfound-image" src={logo} alt="Fox" />
    </div>
  )
}

export default LoadingComponent;