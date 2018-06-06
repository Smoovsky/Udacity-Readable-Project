import {combineReducers} from 'redux';

import * as actions from '../actions';

let categories = (state = [], action) => {
  switch (action.type){
    case actions.GET_CATEGORIES:
      return  action.categories;
    default:
      return state;
  }
};

let posts = (state = {posts:[]}, action) => {
  switch (action.type){
    case actions.GET_ALL_POSTS:
      return {posts: action.posts};

    case actions.NEW_POST:
      if(state.posts){
        state.posts.push(action.post);
      }else{
        return {posts: [action.post]};
      }
      return {posts: state.posts};

    case actions.EDIT_POST:{
      let {title, body} = action.edit.post;
      let {id} = action.edit;
      let {posts} = state;
      posts.forEach((element) => {
        if(element.id === id){
          element.title = title;
          element.body = body;
        }
      });
      return {posts};}

    case actions.VOTE_POST:{
      let {id, vote} = action.vote;
      let {posts} = state;
      posts.forEach((element) => {
        if(element.id === id){
          if(vote === 'upVote'){
            element.voteScore += 1;
          }else if(vote === 'downVote'){
            element.voteScore -= 1;
          }
        }
      });
      return {posts};}

    case actions.DELETE_POST:{
      let {posts} = state;
      posts.forEach((element) => {
        if(element.id === action.delete){
          element.deleted = true;
        }
      });
      return {posts};}

    default:
      return state;
  }
};

let comments = (state = {comments:[]}, action) => {
  switch(action.type){
    case actions.GET_COMMENTS_BY_POST:
      return {comments: action.comments};

    case actions.NEW_COMMENT:
      if(state.comments){
        state.comments.push(action.comment);
      }else{
        return {comments:[action.comment]};
      }
      return {comments: state.comments};

    case actions.EDIT_COMMENT:{
      let {id, comment, timestamp} = action.edit;
      let comments = state.comments;
      comments.forEach((element) => {
        if(element.id === id){
          element.body = comment;
          element.timestamp = timestamp;
        }
      });
      return {comments};}

    case actions.DELETE_COMMENT:{
      let comments = state.comments;
      comments.forEach((element) => {
        if(element.id === action.delete){
          element.deleted = true;
        }
      });
      return {comments};}

    case actions.VOTE_COMMENT:{
      let {id, vote} = action.vote;
      let {comments} = state;
      comments.forEach((element) => {
        if(element.id === id){
          if(vote === 'upVote'){
            element.voteScore += 1;
          }else if(vote === 'downVote'){
            element.voteScore -= 1;
          }
        }
      });
      return {comments};}

    default:
      return state;
  }
};

export default combineReducers({
  categories,
  posts,
  comments
});
