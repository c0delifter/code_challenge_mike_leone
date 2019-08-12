import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import { connect } from 'react-redux';
import { addPost, orderPosts } from '../actions/post_actions';

class PostModal extends Component {
    state = {
        modal: false,
        dropdownOpen: false,
        title: '',
        body: '',
        tags: '',
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }

    onChangeTitle = (e) => {
        this.setState({title: e.target.value});
    }

    onChangeBody = (e) => {
        this.setState({body: e.target.value});
    }

    onChangeTags = (e) => {
        this.setState({tags: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            title: this.state.title,
            body: this.state.body,
            tags: this.state.tags.split(";"),
            dateCreated: Date.now.toString(),
            rating: 0,
        };

        this.props.addPost(newPost);

        this.toggle();
    }

    toggleDDL = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
      }

      ddlSelect = (e) => {
        const val = e.target.value;

        this.props.orderPosts(val.toString());
      }

    render() {
        return(
            <div>
                <Dropdown className="float-left" isOpen={this.state.dropdownOpen} toggle={this.toggleDDL}>
        <DropdownToggle caret color="warning">
          Order by...
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.ddlSelect} value='rating'>Popularity</DropdownItem>
          <DropdownItem onClick={this.ddlSelect} value='date'>Date Added</DropdownItem>
          <DropdownItem onClick={this.ddlSelect} value='title'>Title</DropdownItem>
        </DropdownMenu>
      </Dropdown>
                <Button color="dark" className="float-right" onClick={this.toggle}>Add Post</Button>
                <div className="clearfix mb-4"></div>
                
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Add New Post
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="post">Title</Label>
                                <Input type="text" name="title" id="postTitle" onChange={this.onChangeTitle}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="post">Body</Label>
                                <Input type="textarea" name="body" id="postBody" onChange={this.onChangeBody}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="post">Tags</Label>
                                <Input type="text" name="tags" id="postTags" onChange={this.onChangeTags}/>
                                <span>Note: Tags should be separated with a semi-colon (;)</span>
                            </FormGroup>
                            <Button color="warning" className="mg-2" block>Add</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps, {addPost, orderPosts})(PostModal);