import * as readableAPI from '../readableAPI.js';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const NEW_POST = 'NEW_POST';
export const EDIT_POST = 'EDIT_POST';
export const VOTE_POST = 'VOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const NEW_COMMENT = 'NEW_COMMENT';
export const GET_COMMENTS_BY_POST = 'GET_COMMENTS_BY_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';


Number.prototype.pad = function(size){
  var s = String(this);
  while (s.length < (size || 2)) {s = '0' + s;}
  return s;
};

const guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

const timeFormat = () => {
  let now = new Date();
  return 'at ' + now.getFullYear() + '/' + (now.getMonth()+1).pad() + '/' + (now.getDate()).pad() + ' ' + (now.getHours()).pad() + ':' + (now.getMinutes()).pad();
};

export const getCategories = () => {
  let action = {
    type: GET_CATEGORIES
  };
  return (dispatch) => {
    return readableAPI.getCategories().then((data) => dispatch({...action, categories:data.categories}));
  };
};

export const getAllPosts = () => {
  let action = {
    type: GET_ALL_POSTS
  };
  return (dispatch) => {
    return readableAPI.getAllPosts().then((posts) => {
      dispatch({...action, posts});
    });
  };
};

export const newPost = (post) => {
  post = {
    ...post,
    voteScore: 0,
    timestamp: timeFormat(),
    id: guid(),
    deleted: false
  };
  let action = {
    type: NEW_POST,
    post
  };
  return (dispatch) => {
    return readableAPI.newPost(post).then( () => dispatch(action) );
  };
};

export const editPost = (id, post) => {
  let action = {
    type: EDIT_POST,
    edit: {id, post}
  };

  return (dispatch) => {
    return readableAPI.editPost(id, post).then(() => dispatch(action));
  };
};

export const votePost = (id, vote) => {
  let action = {
    type: VOTE_POST,
    vote: {id, vote}
  };
  return (dispatch) => {
    return readableAPI.votePost(id, vote).then(() => dispatch(action));
  };
};

export const deletePost = (id) => {
  let action = {
    type: DELETE_POST,
    delete: id
  };

  return (dispatch) => {
    return readableAPI.deletePost(id).then(() => dispatch(action));
  };
};

export const getCommentsByPost = (id) => {
  let action = {
    type: GET_COMMENTS_BY_POST
  };
  return (dispatch) => {
    return readableAPI.getCommentsByPost(id).then((comments) => {
      dispatch({...action, comments});
    });
  };
};

export const newComment = (comment) => {
  comment = {
    ...comment,
    timestamp: timeFormat(),
    id:guid(),
    voteScore: 0
  };
  let action = {
    type:NEW_COMMENT,
    comment
  };
  return (dispatch) => {
    return readableAPI.newComment(comment).then(() => {dispatch(action);});
  };
};

export const editComment = (id, comment) => {
  let action = {
    type: EDIT_COMMENT,
    edit: {id, comment, timestamp: timeFormat()}
  };

  return (dispatch) => {
    return readableAPI.editComment(id, {body: comment, timestamp: timeFormat()}).then(() => dispatch(action));
  };
};

export const voteComment = (id, vote) => {
  let action = {
    type: VOTE_COMMENT,
    vote: {id, vote}
  };

  return (dispatch) => {
    return readableAPI.voteComment(id, vote).then(() => dispatch(action));
  };
};

export const deleteComment = (id) => {
  let action = {
    type: DELETE_COMMENT,
    delete: id
  };

  return (dispatch) => {
    return readableAPI.deleteComment(id).then(() => dispatch(action));
  };
};
