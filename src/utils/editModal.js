import React from 'react';

function EditModal({type, newComment, editComment, editPost, editID, closeEditModal}){
  let onSubmit;
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
    onSubmit = function(e){
      e.preventDefault();
      let body = e.target[0].value;
      editComment(editID, body);
      closeEditModal();
      return false;
    };
    break;
  case 'editPost':
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
                    body:<br></br><textarea rows='10' cols='80'></textarea><br></br>
                <input type='submit'></input>
              </form>
            );
          case 'editPost':
            return (
              <form onSubmit={onSubmit}>
                    Title:<br></br><input type='text' name='title'></input><br></br>
                    body:<br></br><textarea rows='10' cols='80'></textarea><br></br>
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

export default EditModal;
