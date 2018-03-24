import React from 'react';
import Post from './post.js';

function PostView({posts}){
  return (
    <div className="postView">
      <ul>
        {posts.map((post)=>{
          return (
            <Post {...post} key={post.id} />
          );
        })}
      </ul>
    </div>
  );
}

export default PostView;
