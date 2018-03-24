import PostUtil from '../utils/postUtil.js';
import React, { Fragment } from 'react';

function Comment({timestamp, author, id, body,type, openEditModal, voteScore,commentCount = ''}){
  return (
    <li style={{overflow:'hidden'}}>
      <div style={{width:'20%'}}>
        <p>{author}</p>
        <p>{timestamp}</p>
      </div>
      <div style={{width:'76%'}}>
        <p>{body}</p>
        <p className="commentVote">vote:{voteScore}{type==='Post'?(<Fragment><br />comments: {commentCount}</Fragment>):null}</p>
        <div style={{hight:'42px'}}></div>
        <PostUtil {...{id, type, openEditModal}}/>
      </div>
    </li>
  );
}

export default Comment;
