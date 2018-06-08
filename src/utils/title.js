import React from 'react';
import { withRouter } from 'react-router-dom';
import Logo from '../imgs/logo.png';
import { Layout, Row, Col } from 'antd';

const { Header } = Layout;
const logoStyle = {
  marginTop:'10px',
  height:'50px',
  width:'190px',
  backgroundImage:`url(${Logo})`,
  backgroundSize: 'auto 100%',
  backgroundRepeat:'no-repeat',
  position:'relative',
  top:'-3px',
  boxShadow:'inset 0px 0px 50px 5px rgba(12,27,45)',
};

let title = withRouter(({history}) => {
  let handler = () => {
    history.push('/');
  };
  return (
    // <div className="title" onClick={ handler}>Readable</div>
    //<Header style={{backgroundColor:'transparent'}}>
    <Header style={{padding:'0 5vw'}}>
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
