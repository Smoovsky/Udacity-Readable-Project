import React from 'react';
import {connect} from 'react-redux';
import {Modal, Form, Input} from 'antd';

const {TextArea} = Input;
const FormItem = Form.Item;

//function EditModal({type, newComment, editComment, editPost, editID, closeEditModal,comments, posts, visible}){
class EditModal extends React.Component{
  state = {
    body:'',
    title:'',
  }
  render = ()=>{
    let modalTitle = '';
    const {getFieldDecorator} = this.props.form;
    const {posts, comments, newComment, editComment, editPost, closeEditModal, editID, visible} = this.props;
    const formItemLayout = {
      labelCol:{
        span: 24,
      },
    };
    let {type} = this.props;
    switch(type){
      case 'newComment':
        this.onSubmit = (e) => {
          e.preventDefault();
          this.props.form.validateFields((err, values)=>{
            if(!err){
              let {author, body} = values;
              newComment({author, body, parentId: editID});
              closeEditModal();
            }
          });
          return false;
        };
        this.form = [];
        this.form.push(
          <FormItem
            {...formItemLayout}
            label="Author"
            key="authorField"
          >
            {getFieldDecorator('author',{
              rules:[{
                required:true, message:'Please enter name of author.'
              },]
            })(
              <Input />
            )}
          </FormItem>);
        this.form.push(
          <FormItem
            {...formItemLayout}
            label="Body"
            key="bodyField"
          >
            {getFieldDecorator('body',{
              rules:[{
                required:true, message:'Please enter name of author.'
              },{
                min:10, message: 'The body of comment should be at least 10 characters in length.'
              }
              ]
            })(
              <TextArea />
            )}
          </FormItem>);
        // this.form.push(
        //   <Button key="submitButton" type="primary" htmlType="submit">
        //     Submit
        //   </Button>
        // );

        break;
      case 'editComment':
        this.target = comments.find((x) => {return x.id === editID;});
        this.body = this.target.body;
        this.onSubmit = (e) => {
          e.preventDefault();
          this.props.form.validateFields((err, values)=>{
            if(!err){
              let {body} = values;
              editComment(editID, body);
              closeEditModal();
            }
          });
          return false;
        };
        this.form = [];
        this.form.push(
          <FormItem
            {...formItemLayout}
            label="Body"
            key="bodyField"
          >
            {getFieldDecorator('body',{
              rules:[{
                required:true, message:'Please enter name of author.'
              },{
                min:10, message: 'The body of comment should be at least 10 characters in length.'
              }
              ],
              initialValue:this.body,
            })(
              <TextArea />
            )}
          </FormItem>);
        // this.form.push(
        //   <Button key="submitButton"  type="primary" htmlType="submit">
        //     Submit
        //   </Button>
        // );

        break;
      case 'editPost':
        this.target = posts.find((x) => {return x.id === editID;});
        this.body = this.target.body;
        this.title = this.target.title;
        this.onSubmit = (e) => {
          e.preventDefault();
          this.props.form.validateFields((err, values)=>{
            if(!err){
              let {body, title} = values;
              editPost(editID, {body, title});
              closeEditModal();
            }
          });
          return false;
        };
        this.form = [];
        this.form.push(
          <FormItem
            {...formItemLayout}
            label="Title"
            key="titleField"
          >
            {getFieldDecorator('title',{
              rules:[{
                required:true, message:'Please enter the title of post.'
              },{
                min:10, message:'The title of post should be at least 10 characters in length.'
              }],
              initialValue:this.title,
            })(
              <Input />
            )}
          </FormItem>);
        this.form.push(
          <FormItem
            {...formItemLayout}
            label="Body"
            key="bodyField"
          >
            {getFieldDecorator('body',{
              rules:[{
                required:true, message:'Please body the title of post.'
              },{
                min:10, message:'The body of post should be at least 10 characters in length.'
              }],
              initialValue:this.body,
            })(
              <TextArea />
            )}
          </FormItem>);
        // this.form.push(
        //   <Button key="submitButton"  type="primary" htmlType="submit">
        //     Submit
        //   </Button>
        // );

        break;
      default:
        break;
    }
    return(
      <Modal
        title={modalTitle}
        visible={visible}
        onOk={this.onSubmit}
        onCancel={closeEditModal}
      >
        <Form onSubmit={this.onSubmit}>
          {this.form}
        </Form>
      </Modal>

    );
  }
}
//   let onSubmit,body,title,target;
//   switch(type){
//     case 'newComment':
//       onSubmit = function(e){
//         e.preventDefault();
//         let author = e.target[0].value;
//         let body = e.target[1].value;
//         newComment({author, body, parentId: editID});
//         closeEditModal();
//         return false;
//       };
//       break;
//     case 'editComment':
//       target = comments.find((x) => {return x.id === editID;});
//       body = target.body;
//       onSubmit = function(e){
//         e.preventDefault();
//         let body = e.target[0].value;
//         editComment(editID, body);
//         closeEditModal();
//         return false;
//       };
//       break;
//     case 'editPost':
//       target = posts.find((x) => {return x.id === editID;});
//       body = target.body;
//       title = target.title;
//       onSubmit = function(e){
//         e.preventDefault();
//         let title = e.target[0].value;
//         let body = e.target[1].value;
//         editPost(editID, {title, body});
//         closeEditModal();
//         return false;
//       };
//       break;
//     default:
//       break;
//   }
//   return (
//
//     <div>
//       {
//         (() => {
//           switch(type){
//             case 'newComment':
//               return (
//                 <form onSubmit={onSubmit}>
//                   Author:<br></br><input type='text' name='Author'></input><br></br>
//                   body:<br></br><textarea rows='10' cols='80'></textarea><br></br>
//                   <input type='submit'></input>
//                 </form>
//               );
//             case 'editComment':
//               return (
//                 <form onSubmit={onSubmit}>
//                     body:<br></br><textarea rows='10' cols='80' defaultValue={body}></textarea><br></br>
//                   <input type='submit'></input>
//                 </form>
//               );
//             case 'editPost':
//               return (
//                 <form onSubmit={onSubmit}>
//                     Title:<br></br><input type='text' name='title' defaultValue={title}></input><br></br>
//                     body:<br></br><textarea rows='10' cols='80' defaultValue={body}></textarea><br></br>
//                   <input type='submit'></input>
//                 </form>
//               );
//             default:
//               return null;
//           }
//         })()
//       }
//     </div>
//   );
// }

function mapStateToProps(state){
  return {
    posts: state.posts.posts,
    comments: state.comments.comments
  };
}

const WrappedEditModal = Form.create()(EditModal);

export default connect(mapStateToProps)(WrappedEditModal);
