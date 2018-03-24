import React from 'react';
import Vote from './vote.js';
import EditDelete from './editDelete.js';

function PostUtil({id, type, openEditModal, title, body}){
  return (
    <div className='postUti'>
      <Vote {...{id, type}} />
      <EditDelete {...{id, type, openEditModal, title, body}} />
    </div>
  );
}

export default PostUtil;
