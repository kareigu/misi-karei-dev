import React from 'react';
import './ChangeLog.css'

interface IProps {
  date: number,
  log: string,
  id: string,
}

function getTh(n: number) {
  if(n === 1)
    return 'st'
  else if(n === 2)
    return 'nd'
  else if(n === 3)
    return 'rd'
  else
    return 'th'
}

function ChangeLog(props: IProps) {
  const date = new Date(props.date);

  const formattedDate = `${date.getDate()}${getTh(date.getDate())} of ${date.toLocaleDateString('default', {month: 'long'})}, ${date.getFullYear()}`

  return(
    <div id={props.id} className="changelog">
      <h1>{formattedDate}</h1>
      <pre>{props.log}</pre>
    </div>
  )
}

export default ChangeLog;