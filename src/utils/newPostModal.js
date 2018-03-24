import React from 'react';

function NewPostModal({newPost, categories, closeNewPostModal}){
  let onSubmit = function(e){
    e.preventDefault();
    let category = e.target[0].value;
    let title = e.target[1].value;
    let author = e.target[2].value;
    let body = e.target[3].value;
    newPost({title, author, body, category});
    closeNewPostModal();
    return false;
  };

  return (
    <form onSubmit={onSubmit}>
      <select>
        {categories.map((cat) => {
          return <option value={cat.name} key={cat.name}>
            {cat.name}
          </option>;
        })}
      </select><br></br>
      Title:<br></br><input type='text' name='title'></input><br></br>
      Author:<br></br><input type='text' name='Author'></input><br></br>
      body:<br></br><textarea rows='10' cols='80'></textarea><br></br>
      <input type='submit'></input>
    </form>
  );
}

export default NewPostModal;
