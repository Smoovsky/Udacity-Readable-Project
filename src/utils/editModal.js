import React from 'react';
import {connect} from 'react-redux';

function EditModal({type, newComment, editComment, editPost, editID, closeEditModal,comments, posts}){
  let onSubmit,body,title,target;
  switch(type){
  case 'newComment':
    onSubmit = function(e){
      e.preventDefault();
      let author = e.target[0].value;
      let body = e.target[1].value;
      newComment({author, body, parentId: editID});
      closeEditModal();
      return false;
    };
    break;
  case 'editComment':
    target = comments.find((x) => {return x.id === editID;});
    body = target.body;
    onSubmit = function(e){
      e.preventDefault();
      let body = e.target[0].value;
      editComment(editID, body);
      closeEditModal();
      return false;
    };
    break;
  case 'editPost':
    target = posts.find((x) => {return x.id === editID;});
    body = target.body;
    title = target.title;
    onSubmit = function(e){
      e.preventDefault();
      let title = e.target[0].value;
      let body = e.target[1].value;
      editPost(editID, {title, body});
      closeEditModal();
      return false;
    };
    break;
  default:
    break;
  }
  return (
    <div>
      {
        (() => {
          switch(type){
          case 'newComment':
            return (
              <form onSubmit={onSubmit}>
                  Author:<br></br><input type='text' name='Author'></input><br></br>
                  body:<br></br><textarea rows='10' cols='80'></textarea><br></br>
                <input type='submit'></input>
              </form>
            );
          case 'editComment':
            return (
              <form onSubmit={onSubmit}>
                    body:<br></br><textarea rows='10' cols='80' defaultValue={body}></textarea><br></br>
                <input type='submit'></input>
              </form>
            );
          case 'editPost':
            return (
              <form onSubmit={onSubmit}>
                    Title:<br></br><input type='text' name='title' defaultValue={title}></input><br></br>
                    body:<br></br><textarea rows='10' cols='80' defaultValue={body}></textarea><br></br>
                <input type='submit'></input>
              </form>
            );
          default:
            return null;
          }
        })()
      }
    </div>
  );
}

function mapStateToProps(state){
  return {
    posts: state.posts.posts,
    comments: state.comments.comments
  };
}
export default connect(mapStateToProps)(EditModal);
