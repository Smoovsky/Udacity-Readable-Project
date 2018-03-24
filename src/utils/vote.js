import {votePost, voteComment} from '../actions';
import {connect} from 'react-redux';
import React from 'react';

function vote({type, id, votePost, voteComment}){
  let voteFunc;
  switch(type){
    case 'Post':
      voteFunc = votePost;
      break;
    case 'Comment':
      voteFunc = voteComment;
      break;
    default:
      break;
  }
  return (
  <div style={{float:'right'}}>
    <a onClick={(e)=>{
        e.preventDefault();
        voteFunc(id, 'upVote');
      }}>up</a>
    <a onClick={(e)=>{
        e.preventDefault();
        voteFunc(id, 'downVote');
      }}>down</a>
  </div>
  )
}

let mapDispatchToProps = (dispatch) => {
  return {
    votePost: (id, vote) => dispatch(votePost(id, vote)),
    voteComment: (id, vote) => dispatch(voteComment(id, vote))
  };
};

export default connect(null, mapDispatchToProps)(vote);
