import React from 'react';
import {List, Icon} from 'antd';
import {Link} from 'react-router-dom';
import Vote from '../utils/vote.js';

let contentStyle = {
  margin:'0 50px',
};

function PostView({posts, loading}){

  return (
    <List
      bordered
      style={contentStyle}
      itemLayout="vertical"
      loading={loading}
      dataSource={posts}
      renderItem={(item)=>{
        let {commentCount, voteScore} = item;
        let commentCountDisplay = (<React.Fragment><Icon type="message" style={{fontSize:'15px'}}/>{' '+commentCount}</React.Fragment>);
        let voteCountDisplay = (<React.Fragment><Vote key={'vote'+item.id} id={item.id} type={'Post'}/>{' '+voteScore}</React.Fragment>);
        return (
          <List.Item
            actions={[commentCountDisplay, voteCountDisplay]}>
            <List.Item.Meta
              title={<Link to={`/posts/${item.category}/${item.id}`}>{item.title}</Link>}
              description={'by '+item.author+' '+item.timestamp}
            />
          </List.Item>);
      }}
    />
    // <div className="postView">
    //   <ul>
    //     {posts.map((post)=>{
    //       return (
    //         <Post {...post} key={post.id} />
    //       );
    //     })}
    //   </ul>
    // </div>
  );
}

export default PostView;
