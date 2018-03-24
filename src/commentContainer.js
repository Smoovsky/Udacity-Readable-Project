import React, {Component} from 'react';
import {getCommentsByPost, getAllPosts} from './actions';
import {connect} from 'react-redux';
import CommentView from './components/commentView.js';
import Modal from 'react-modal';
import CommentIndexUtil from './utils/commentIndexUtil.js';
import {newComment, editPost, editComment} from './actions';
import EditModal from './utils/editModal.js';
import sortBy from 'sort-by';
import {Redirect} from 'react-router-dom';

class CommentContainer extends Component{
  state = {
    editModalOpen:false,
    editModalType:'newComment',
    sortBy:'voteScore',
    order:'descending',
    editID: undefined
  }

  componentDidMount(){
    Modal.setAppElement('body');
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

  setSortOrder = (sortOrder) => {
    this.setState({sortOrder});
  }


  componentWillMount(){
    this.id = this.props.match.params.id;
    this.props.getCommentsByPost(this.id);
    this.props.getAllPosts();
  }

  render(){
    let isModalOpen = this.state.editModalOpen;
    let post = this.props.posts.posts.find((post)=>{
      return post.id === this.id;
    });
    let sort = (this.state.sortOrder === 'descending'?('-' + this.state.sortBy):(this.state.sortBy));
    let comments = [...this.props.comments.comments].sort(sortBy(sort));


    return (
      <div className="container">
        <CommentIndexUtil
          setSort={this.setSort}
          setSortOrder={this.setSortOrder}
          openEditModal={this.openEditModal}
          postID={this.id}
        />
        {post?<CommentView comments={comments} {...{post}}
          openEditModal={this.openEditModal}
        />:<Redirect to="/unfound"/>}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={this.closeEditModal}
          contentLabel='Modal'
        >
          <EditModal
            type={this.state.editModalType}
            editID={this.state.editID}
            newComment={this.props.newComment}
            editComment={this.props.editComment}
            editPost={this.props.editPost}
            closeEditModal={this.closeEditModal}
          />
        </Modal>
      </div>
    );}
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
