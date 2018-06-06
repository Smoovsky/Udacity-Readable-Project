import { votePost, voteComment } from '../actions';
import { connect } from 'react-redux';
import React from 'react';
import {Icon} from 'antd';

function vote({ type, id, votePost, voteComment }) {
  let voteFunc;
  switch (type) {
    case 'Post':
      voteFunc = votePost;
      break;
    case 'Comment':
      voteFunc = voteComment;
      break;
    default:
      break;
  }
  return ([
    <Icon
      style={{fontSize:'15px',marginRight:'10px'}}
      type="like-o"
      key="up"
      onMouseEnter={
        (e)=>{
          e.target.classList.remove('anticon-like-o');
          e.target.classList.add('anticon-like');
        }
      }
      onMouseLeave={
        (e)=>{
          e.target.classList.remove('anticon-like');
          e.target.classList.add('anticon-like-o');
        }
      }
      onClick={e => {
        e.preventDefault();
        voteFunc(id, 'upVote');
      }}
    />,
    <Icon
      style={{fontSize:'15px',marginRight:'10px'}}
      type="dislike-o"
      key="down"
      onMouseEnter={
        (e)=>{
          e.target.classList.remove('anticon-dislike-o');
          e.target.classList.add('anticon-dislike');
        }
      }
      onMouseLeave={
        (e)=>{
          e.target.classList.remove('anticon-dislike');
          e.target.classList.add('anticon-dislike-o');
        }
      }
      onClick={e => {
        e.preventDefault();
        voteFunc(id, 'downVote');
      }}
    />
  ]);
}

let mapDispatchToProps = dispatch => {
  return {
    votePost: (id, vote) => dispatch(votePost(id, vote)),
    voteComment: (id, vote) => dispatch(voteComment(id, vote))
  };
};

export default connect(null, mapDispatchToProps)(vote);
