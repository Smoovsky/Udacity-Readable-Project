import {deletePost, deleteComment} from '../actions';
import {connect} from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';


let editDelete = withRouter(function({type, id, deletePost, deleteComment, openEditModal, history}){
  let funcDelete;
  switch(type){
  case 'Post':
    funcDelete = deletePost;
    break;
  case 'Comment':
    funcDelete = deleteComment;
    break;
  default:
    break;
  }
  return (
    <div style={{clear:'both'}}>
      <a onClick={(e)=>{
        e.preventDefault();
        openEditModal('edit'+type, id);
      }}>edit</a>
      <a onClick={(e)=>{
        e.preventDefault();
        funcDelete(id);
        if(type === 'Post'){history.push('/');}
      }}>delete</a>
    </div>
  );
});

let mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (id) => dispatch(deletePost(id)),
    deleteComment: (id) => dispatch(deleteComment(id))
  };
};

export default connect(null, mapDispatchToProps)(editDelete);
