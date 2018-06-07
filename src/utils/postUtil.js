import React from 'react';
import EditDelete from './editDelete.js';

function PostUtil({id, type, openEditModal, title, body}){
  return (
    <EditDelete {...{id, type, openEditModal, title, body}} key={type+id+'ED'}/>
  );
}

export default PostUtil;
