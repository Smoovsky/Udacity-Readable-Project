import React, { Component } from 'react';
import PostContainer from './postContainer';
import { Route, Switch } from 'react-router-dom';
import CommentContainer from './commentContainer';
import Title from './utils/title.js';
import Unfound from './components/Unfound.js';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Title />
        <Switch>
          <Route exact path='/' component={PostContainer} />
          <Route path='/posts/:category/:id' component={CommentContainer} />
          <Route component={Unfound} />
        </Switch>
      </div>
    );
  }
}

export default App;
