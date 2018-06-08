import React from 'react';
import { Row, Col, Button, Menu, Dropdown, Icon, Popover } from 'antd';
import throttle from 'lodash.throttle';

const PopoverButton = {
  display:'block',
  width:'50px',
  height:'50px',
  color:'white',
  fontSize:'50px',
  margin:'5px 5vw',
};

function CommentIndexUtil({openEditModal, setSort, setSortOrder, postID, sort, order, visibleControl = null}){
  let utilStyle = {
    margin:'5px 5vw',
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
    <Row style={utilStyle} type="flex" justify="space-between">
      <Col sm={{span:24}} xs={{span:24}} md={{span:12}} style={{textAlign:'center', margin:'5px auto'}}>
        <Button
          type="primary"
          onClick={(e)=>{
            e.preventDefault();
            visibleControl? visibleControl(false): null;
            openEditModal('newComment', postID);
          }}>
          <Icon type="edit" />New Comment
        </Button>
      </Col>

      <Col sm={{span:24}} xs={{span:24}} md={{span:12}} style={{textAlign:'center', margin:'5px auto'}}>
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
      </Col>
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

class ResponsiveCommentIndexUtil extends React.Component{
  state = {
    viewPortWidth: 0,
    menuVisible: false,
  }
  componentDidMount(){
    this.saveViewportDimensions();
    window.addEventListener('resize', this.saveViewportDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.saveViewportDimensions);
  }
  saveViewportDimensions = throttle(()=>{
    this.setState({
      viewPortWidth: window.innerWidth,
    });
  }, 250)
  onVisibleChange = (menuVisible)=>{
    this.setState({menuVisible});
  }
  render = ()=>{
    if(this.state.viewPortWidth > 768){
      return (<CommentIndexUtil {...this.props}/>);
    }
    return (
      <Row type="flex" justify="end" style={{position:'absolute', top:'0', width:'30%', right:'0'}}>
        <Popover
          content={<CommentIndexUtil {...this.props} visibleControl={this.onVisibleChange} />}
          trigger="click"
          visible={this.state.menuVisible}
          onVisibleChange={this.onVisibleChange}
        >
          <Icon type="bars" style={PopoverButton}/>
        </Popover>
      </Row>
    );
  }
}

export default ResponsiveCommentIndexUtil;
