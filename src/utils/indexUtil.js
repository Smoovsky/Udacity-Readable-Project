import React from 'react';
import { Row, Col, Button, Select, Menu, Dropdown, Icon, Popover } from 'antd';
import styled from 'styled-components';
import throttle from 'lodash.throttle';

const StyledSelect = styled(Select)`
  width:100px
`;

const PopoverButton = {
  display:'block',
  width:'50px',
  height:'50px',
  color:'white',
  fontSize:'50px',
  margin:'5px 5vw',
};
const Option = Select.Option;

function IndexUtil({openNewPostModal,  setFilter, categories, setSort, setSortOrder, sort, order, visibleControl=null}){
  let Options = [];
  let utilStyle = {
    margin:'5px 5vw',
  };
  for (let cat of categories){
    Options.push(
      <Option value={cat.name} key={cat.name}>
        {cat.name}
      </Option>
    );
  }
  Options.push(
    <Option value="none" key="none">All</Option>
  );


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
      <Col sm={{span:24}} xs={{span:24}} md={{span:8}} style={{textAlign:'center', margin:'5px auto'}}>
        <Button
          type="primary"
          onClick={(e)=>{
            e.preventDefault();
            visibleControl? visibleControl(false): null;
            openNewPostModal();
          }}>
          <Icon type="edit" />New Post
        </Button>
      </Col>
      <Col sm={{span:24}} xs={{span:24}} md={{span:8}} style={{textAlign:'center', margin:'5px auto'}}>
        View&nbsp;
        <StyledSelect
          onChange={(value)=>{
            setFilter(value);
          }}
          defaultValue="none">
          {Options}
        </StyledSelect>
      </Col>
      <Col sm={{span:24}} xs={{span:24}} md={{span:8}} style={{textAlign:'center', margin:'5px auto'}}>
        Sort by&nbsp;
        {/* <StyledSelect onChange={(e)=>{
          setSort(e.target.value);
        }}>
          <Option value="timestamp">date</Option>
          <Option value="voteScore">vote</Option>
        </StyledSelect>
        <StyledSelect onChange={(e)=>{
          setSortOrder(e.target.value);
        }}>
          <Option value="descending">descending</Option>
          <Option value="ascending">ascending</Option>
        </StyledSelect> */}
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
  );
}

class ResponsiveIndexUtil extends React.Component{
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
      return (<IndexUtil {...this.props}/>);
    }
    return (
      <Row type="flex" justify="end" style={{position:'absolute', top:'0', width:'30%', right:'0'}}>
        <Popover
          content={<IndexUtil {...this.props} visibleControl={this.onVisibleChange} />}
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

export default ResponsiveIndexUtil;
