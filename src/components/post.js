import {Link} from 'react-router-dom';
import Vote from '../utils/vote.js';
import React from 'react';

function Post({title, timestamp, author, id, voteScore, commentCount, category}){
  return (
    <li>
      <div><Link to={`/posts/${category}/${id}`}>{title}</Link></div>
      <div>by {author} {timestamp}</div>
      <div><Vote id={id} type={'Post'}/><div style={{float:'right'}}>Votescore: {voteScore}<br />Comments: {commentCount}</div></div>
    </li>
  );
}

export default Post;
