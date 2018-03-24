import React from 'react';

function IndexUtil({openNewPostModal,  setFilter, categories, setSort, setSortOrder}){
  return (
    <div className="toolbar">

      <span>
        <a onClick={(e)=>{
            e.preventDefault();
            openNewPostModal();
          }}>
          New Post
        </a>
      </span>

      <span>view<select onChange={(e)=>{
          setFilter(e.target.value);
        }}>
        {(() => {
          let options = [];
          for (let cat of categories){
            options.push(
              <option value={cat.name} key={cat.name}>
                {cat.name}
              </option>
            );
          }
          options.push(
            <option value="none" key="none">All</option>
          );
          return options;
        })()}
      </select>only</span>

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
};

export default IndexUtil;
