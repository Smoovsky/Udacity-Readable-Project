import React from 'react';
import Comment from './comment.js';

function CommentView({post, comments, openEditModal}){
  return(
    <div className='post'>
      <ul>
        <Comment {...post} type='Post' openEditModal={openEditModal} />
        {comments?comments.map((comment) => {
          return (comment.deleted?null:<Comment {...comment} type='Comment' openEditModal={openEditModal}  key={comment.id}/>);
        }):null}
      </ul>
    </div>
  );
}
export default CommentView;
