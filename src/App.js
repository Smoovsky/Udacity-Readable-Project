import React, { Component } from 'react';
import PostContainer from './postContainer';
import { Route, Switch } from 'react-router-dom';
import CommentContainer from './commentContainer';
import Title from './utils/title.js';
import Unfound from './components/Unfound.js';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

class App extends Component {
  componentDidMount(){
    document.title = 'Readable';
  }
  render() {
    return (
      <Layout>
        <Title />
        <Switch>
          <Route exact path='/' component={PostContainer} />
          <Route path='/posts/:category/:id' component={CommentContainer} />
          <Route component={Unfound} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
