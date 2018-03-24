import React from 'react';
import { withRouter } from 'react-router-dom';

let title = withRouter(({history}) => {
  let handler = () => {
    history.push('/')
  };
  return (
    <div className="title" onClick={handler}>Readable</div>
  );
})

export default title;
