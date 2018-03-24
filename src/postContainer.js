import React, {Component} from 'react';
import PostView from './components/postView.js';
import IndexUtil from './utils/indexUtil.js';
import NewPostModal from './utils/newPostModal';
import {newPost, getAllPosts, getCategories} from './actions';
import {connect} from 'react-redux';
import Modal from  'react-modal';
import sortBy from 'sort-by';

class postContainer extends Component {
  state = {
    openNewPostModalOpen: false,
    sortBy: 'timestamp',
    sortOrder: 'descending',
    filter: 'none'
  }

  componentDidMount(){
    this.props.getCategories();
    this.props.getAllPosts();
    Modal.setAppElement('body');
  }

  sortBy = (sort)=>{
    this.setState({sortBy: sort});
  }

  setSortOrder = (sortOrder) => {
    this.setState({sortOrder});
  }

  openNewPostModal = () => {
    this.setState({openNewPostModalOpen: true});
  }

  closeNewPostModal = () => {
    this.setState({openNewPostModalOpen: false});
  }

  setFilter = (filter) => {
    this.setState({filter});
  }

  setSort = (sortBy) => {
    this.setState({sortBy});
  }

  render(){
    let posts = [];
    let openNewPostModalOpen = this.state.openNewPostModalOpen;
    let closeNewPostModal = this.closeNewPostModal;
    let categories = this.props.categories;
    let newPost = this.props.newPost;


    posts = this.props.posts.posts.filter((post)=>{
      return (post.category === this.state.filter || this.state.filter === 'none') && post.deleted === false;
    });

    let sort = (this.state.sortOrder === 'descending'?('-' + this.state.sortBy):(this.state.sortBy));
    posts.sort(sortBy(sort));

    return (
      <div>
        <IndexUtil categories={this.props.categories} setFilter={this.setFilter} setSort={this.setSort} setSortOrder={this.setSortOrder} openNewPostModal={this.openNewPostModal} />
        <PostView posts={posts} />
        <Modal
          isOpen={openNewPostModalOpen}
          onRequestClose={this.closeNewPostModal}
          contentLabel='Modal'
        >
          <NewPostModal  {...{newPost, categories, closeNewPostModal}}/>
        </Modal>
      </div>
    );
  }

}

function mapStateToProps({posts, categories}){
  return {
    posts,
    categories
  };
}

function mapDispatchToProps(dispatch){
  return {
    newPost: (post) => dispatch(newPost(post)),
    getAllPosts: () => dispatch(getAllPosts()),
    getCategories: () => dispatch(getCategories())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(postContainer);
