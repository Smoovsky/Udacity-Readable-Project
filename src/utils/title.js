import React from 'react';
import { withRouter } from 'react-router-dom';
import Logo from '../imgs/logo.png';
import { Layout, Row, Col } from 'antd';

const { Header } = Layout;
const logoStyle = {
  marginTop:'10px',
  height:'30px',
  width:'150px',
  backgroundImage:`url(${Logo})`,
  backgroundSize: '100% auto',
};

let title = withRouter(({history}) => {
  let handler = () => {
    history.push('/');
  };
  return (
    // <div className="title" onClick={ handler}>Readable</div>
    //<Header style={{backgroundColor:'transparent'}}>
    <Header>
      <Row>
        <Col span={6} onClick={handler}>
          <div style={logoStyle} />
        </Col>
        <Col span={18}>

        </Col>
      </Row>

    </Header>
  );
});



export default title;
