import React from 'react';
import {Modal, Form, Input, Select} from 'antd';

const {TextArea} = Input;
const FormItem = Form.Item;

class NewPostModal extends React.Component{
  render = ()=>{
    let modalTitle = 'New Post';
    const {getFieldDecorator} = this.props.form;
    const {newPost, categories, closeNewPostModal, visible} = this.props;
    //console.log(categories);
    const formItemLayout = {
      labelCol:{
        span: 24,
      },
    };
    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values)=>{
        if(!err){
          let {category, title, author, body} = values;
          newPost({title, author, body, category});
          closeNewPostModal();
        }
      });
      return false;
    };
    this.form = [];
    categories.length > 0 ? this.form.push(
      <FormItem
        {...formItemLayout}
        label="Category"
        key="categoryField"
      >
        {getFieldDecorator('category',{
          rules:[{
            required:true, message:'Please select a category.'
          },],
          initialValue:categories[0].name
        })(
          <Select>
            {categories.map((x)=>
              <Select.Option value={x.name} key={x.name}>
                {x.name}
              </Select.Option>
            )}
          </Select>
        )}
      </FormItem>):null;
    this.form.push(
      <FormItem
        {...formItemLayout}
        label="Author"
        key="authorField"
      >
        {getFieldDecorator('author',{
          rules:[{
            required:true, message:'Please enter name of author.'
          },{
            min:4, message: 'The body of comment should be at least 4 characters in length.'
          }
          ]
        })(
          <Input />
        )}
      </FormItem>);
    this.form.push(
      <FormItem
        {...formItemLayout}
        label="Title"
        key="titleField"
      >
        {getFieldDecorator('title',{
          rules:[{
            required:true, message:'Please enter a title.'
          },{
            min:10, message: 'The body of comment should be at least 10 characters in length.'
          }
          ]
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
            required:true, message:'Please enter body of post.'
          },{
            min:10, message: 'The body of comment should be at least 10 characters in length.'
          }
          ]
        })(
          <TextArea />
        )}
      </FormItem>);
    return(
      <Modal
        title={modalTitle}
        visible={visible}
        onOk={this.onSubmit}
        onCancel={closeNewPostModal}
      >
        <Form onSubmit={this.onSubmit}>
          {this.form}
        </Form>
      </Modal>

    );
  }
}

// function NewPostModal({newPost, categories, closeNewPostModal}){
//   let onSubmit = function(e){
//     e.preventDefault();
//     let category = e.target[0].value;
//     let title = e.target[1].value;
//     let author = e.target[2].value;
//     let body = e.target[3].value;
//     newPost({title, author, body, category});
//     closeNewPostModal();
//     return false;
//   };
//
//   return (
//     <form onSubmit={onSubmit}>
//       <select>
//         {categories.map((cat) => {
//           return <option value={cat.name} key={cat.name}>
//             {cat.name}
//           </option>;
//         })}
//       </select><br></br>
//       Title:<br></br><input type='text' name='title'></input><br></br>
//       Author:<br></br><input type='text' name='Author'></input><br></br>
//       body:<br></br><textarea rows='10' cols='80'></textarea><br></br>
//       <input type='submit'></input>
//     </form>
//   );
// }

export default Form.create()(NewPostModal);
