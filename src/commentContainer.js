import React, {Component} from 'react';
import {getCommentsByPost, getAllPosts} from './actions';
import {connect} from 'react-redux';
import CommentView from './components/commentView.js';
import Modal from 'react-modal';
import CommentIndexUtil from './utils/commentIndexUtil.js';
import {newComment, editPost, editComment} from './actions';
import EditModal from './utils/editModal.js';
import sortBy from 'sort-by';
import {Layout} from 'antd';

let Content = Layout.Content;
let contentStyle = {
  minHeight:'100vh',
};

class CommentContainer extends Component{
  state = {
    editModalOpen:false,
    editModalType:'newComment',
    sortBy:'timestamp',
    order:'descending',
    editID: undefined,
    ready: false
  }

  componentDidMount(){
    Modal.setAppElement('body');
    this.id = this.props.match.params.id;
    this.props.getAllPosts().then(() => {this.props.getCommentsByPost(this.id);}).then(() => {this.setState({ready:true});});
  }

  openEditModal = (type, editID) => {
    this.setState({editModalType:type, editModalOpen:true, editID});
  }

  closeEditModal = () => {
    this.setState({editModalOpen:false});
  }


  setSort = (sortBy) => {
    this.setState({sortBy});
  }

  setSortOrder = (order) => {
    this.setState({order});
  }

  render(){
    let post = this.props.posts.posts.find((post)=>{
      return post.id === this.id;
    });
    let sort = (this.state.order === 'descending'?('-' + this.state.sortBy):(this.state.sortBy));
    let comments = [...this.props.comments.comments].sort(sortBy(sort));

    return (
      <Content style={contentStyle}>
        <CommentIndexUtil
          setSort={this.setSort}
          setSortOrder={this.setSortOrder}
          openEditModal={this.openEditModal}
          postID={this.id}
          sort={this.state.sortBy}
          order={this.state.order}
        />
        <CommentView comments={comments} {...{post}}
          openEditModal={this.openEditModal}
          loading={!this.state.ready}
        />
        <EditModal
          type={this.state.editModalType}
          editID={this.state.editID}
          newComment={this.props.newComment}
          editComment={this.props.editComment}
          editPost={this.props.editPost}
          closeEditModal={this.closeEditModal}
          visible={this.state.editModalOpen}
        />
      </Content>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    getCommentsByPost: (id) => dispatch(getCommentsByPost(id)),
    getAllPosts: () => dispatch(getAllPosts()),
    newComment: (comment) => dispatch(newComment(comment)),
    editPost: (id, post) => dispatch(editPost(id, post)),
    editComment: (id, comment) => dispatch(editComment(id, comment))
  };
};

let mapStateToProps = ({comments, posts}) => {
  return {comments, posts};
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
