import React from 'react';

function CommentIndexUtil({openEditModal, setSort, setSortOrder, postID}){
  return (
    <div className="toolbar">

      <span>
        <a onClick={(e)=>{
          e.preventDefault();
          openEditModal('newComment', postID);
        }}>
          New Comment
        </a>
      </span>

      <span></span>

      <span>
        sort by
        <select onChange={(e)=>{
          setSort(e.target.value);
        }}>

          <option value="timestamp">date</option>

          <option value="voteScore">vote</option>

        </select>

        <select onChange={(e)=>{
          setSortOrder(e.target.value);
        }}>

          <option value="descending">descending</option>

          <option value="ascending">ascending</option>

        </select>
      </span>

    </div>
  );
}

export default CommentIndexUtil;
