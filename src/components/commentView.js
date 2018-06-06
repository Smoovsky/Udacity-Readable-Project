import React from 'react';
import Comment from './comment.js';
import {List, Icon} from 'antd';
import {Link} from 'react-router-dom';
import Vote from '../utils/vote.js';
import EditDelete from '../utils/editDelete.js';

let contentStyle = {
  margin:'0 50px',
};

function CommentView({post, comments, openEditModal, loading}){
  comments = (post && comments) ? [post, ...comments] : [];
  return (
    <List
      bordered
      style={contentStyle}
      itemLayout="vertical"
      loading={loading}
      dataSource={comments}
      renderItem={(item, index)=>{
        // <List.Item actions={[<a key="1">edit</a>, <a key="2">more</a>]}>
        let {voteScore} = item;

        let voteCountDisplay = (<React.Fragment><Vote key={'vote'+item.id} id={item.id} type={index==0?'Post':'Comment'}/>{' '+voteScore}</React.Fragment>);
        return (
          <List.Item
            actions={[voteCountDisplay,
              <EditDelete
                key={item.id+'ED'}
                type={index==0?'Post':'Comment'}
                id={item.id}
                openEditModal={openEditModal}
                title={item.title?item.title:''}
                body={item.body}
              />]}>
            <List.Item.Meta
              title={item.title?item.title:''}
              description={'by '+item.author+' '+item.timestamp}
            />
            {item.body}
          </List.Item>);
      }}
    />
  )
  return(
    <div className='post'>
      <ul>
        <Comment {...post} type='Post' openEditModal={openEditModal} />
        {comments?comments.map((comment) => {
          return (comment.deleted?null:<Comment {...comment} type='Comment' openEditModal={openEditModal}  key={comment.id}/>);
        }):null}
      </ul>
    </div>
  );
}
export default CommentView;
