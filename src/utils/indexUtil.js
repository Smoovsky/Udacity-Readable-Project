import React from 'react';
import { Row, Col, Button, Select, Menu, Dropdown, Icon } from 'antd';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  width:100px
`;
const Option = Select.Option;

function IndexUtil({openNewPostModal,  setFilter, categories, setSort, setSortOrder, sort, order}){
  let Options = [];
  let utilStyle = {
    padding:'5px 0',
  };
  let colStyle = {
    textAlign:'center',
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
    <Row style={utilStyle} type="flex" justify="space-around">
      <Col span={8} style={colStyle}>
        <Button
          type="primary"
          onClick={(e)=>{
            e.preventDefault();
            openNewPostModal();
          }}>
          <Icon type="edit" />New Post
        </Button>
      </Col>
      <Col span={8} style={colStyle}>
        View&nbsp;
        <StyledSelect
          onChange={(value)=>{
            setFilter(value);
          }}
          defaultValue="none">
          {Options}
        </StyledSelect>
      </Col>
      <Col span={8} style={colStyle}>
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

export default IndexUtil;
