import React from 'react';
import { Row, Col, Button, Menu, Dropdown, Icon } from 'antd';

function CommentIndexUtil({openEditModal, setSort, setSortOrder, postID, sort, order}){
  let utilStyle = {
    padding:'5px 0',
  };
  let colStyle = {
    textAlign:'center',
  };
  let handleSort = (e) => {
    setSort(e.key);
  };
  let handleOrder = () => {
    order === 'ascending' ? setSortOrder('descending') : setSortOrder('ascending');
  };
  const menuSort = (
    <Menu onClick={handleSort}>
      <Menu.Item key="timestamp">Date</Menu.Item>
      <Menu.Item key="voteScore">Vote</Menu.Item>
    </Menu>
  );
  return (
    <Row style={utilStyle} type="flex" justify="space-around">
      <Col span={8} style={colStyle}>
        <Button
          type="primary"
          onClick={(e)=>{
            e.preventDefault();
            openEditModal('newComment', postID);
          }}>
          <Icon type="edit" />New Comment
        </Button>
      </Col>
      <Col span={8} style={colStyle}>
      </Col>
      <Button.Group>
        <Dropdown overlay={menuSort}>
          <Button>
            {sort === 'timestamp' ? 'Date' : 'Vote'}
          </Button>
        </Dropdown>
        <Button onClick={handleOrder}>
          {order === 'descending' ? (<React.Fragment>Descend <Icon type="down"/></React.Fragment>) : (<React.Fragment>Ascend <Icon type="up"/></React.Fragment>)}
        </Button>
      </Button.Group>
    </Row>
    // <div className="toolbar">
    //
    //   <span>
    //     <a onClick={(e)=>{
    //       e.preventDefault();
    //       openEditModal('newComment', postID);
    //     }}>
    //       New Comment
    //     </a>
    //   </span>
    //
    //   <span></span>
    //
    //   <span>
    //     sort by
    //     <select onChange={(e)=>{
    //       setSort(e.target.value);
    //     }}>
    //
    //       <option value="timestamp">date</option>
    //
    //       <option value="voteScore">vote</option>
    //
    //     </select>
    //
    //     <select onChange={(e)=>{
    //       setSortOrder(e.target.value);
    //     }}>
    //
    //       <option value="descending">descending</option>
    //
    //       <option value="ascending">ascending</option>
    //
    //     </select>
    //   </span>
    //
    // </div>
  );
}

export default CommentIndexUtil;
