import React, {Component} from 'react';
import {
    ListGroup,
    ListGroupItem,
    Badge,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col
} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {faPencilAlt, faTrash, faPlus, faMinus, faSearch } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {connect} from 'react-redux';
import {getPosts, deletePost, editPost, changeRating, searchByTags} from '../actions/post_actions';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import 'moment-timezone';

class BulletinList extends Component {

    state = {
        modal: false,
        modifiedId: '',
        modifiedBody: '',
        modifiedTitle: '',
        modifiedTags: [],
        searchKeyword: "",
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChangeTitle = (e) => {
        this.setState({modifiedTitle: e.target.value});
    }

    onChangeBody = (e) => {
        this.setState({modifiedBody: e.target.value});
    }

    onChangeTags = (e) => {
        this.setState({
            modifiedTags: e
                .target
                .value
                .split(";")
        });
    }

    componentDidMount() {
        this
            .props
            .getPosts('rating');
        this.setState({allPosts: this.props.post.posts});
    }

    removePost = (_id) => {
        this
            .props
            .deletePost(_id);
    }

    editPost = (post) => {
        this.setState({modifiedId: post._id, modifiedTags: post.tags, modifiedTitle: post.title, modifiedBody: post.body});

        this.toggle();
    }

    onSubmit = (e) => {
        e.preventDefault();

        const updatedPost = {
            _id: this.state.modifiedId,
            title: this.state.modifiedTitle,
            body: this.state.modifiedBody,
            tags: this.state.modifiedTags
        };

        this
            .props
            .editPost(updatedPost);

        this.toggle();
    }

    changePostRating = (post, action) => {
        if (action === "increase") {
            post.rating = post.rating + 1;
            this
                .props
                .changeRating(post);
        } else {
            post.rating = post.rating - 1;
            this
                .props
                .changeRating(post);
        }
    }

    filterByTags = (e) => {
        this.setState({searchKeyword: e.target.value});
    }

    onSearch = (e) => {
        e.preventDefault();  
        this.props.searchByTags(this.state.searchKeyword);

    }


    render() {
        const {posts} = this.props.post;
        return (
            <div>
                <div className="clearfix"></div>
                <Form onSubmit={this.onSearch}>
               <Row>
                   <Col sm="10">
                    <FormGroup>
                        <Input
                            type="text"
                            name="tagFilter"
                            id="tagFilter"
                            placeholder="Search by tags..."
                            onChange={this.filterByTags}/>
                           
                    </FormGroup>
                    </Col>
                    <Col sm="2"><Button block color="warning" className="mr-3"><FontAwesomeIcon icon={faSearch}/>&nbsp;Search</Button></Col>
               </Row>
                    
                </Form>
                <ListGroup>
                    <TransitionGroup className="bulletinPosts">
                        <div className="d-sm-none d-md-block">
                            {posts.map((post) => (
                                <CSSTransition key={post._id} timeout={500} classNames="fade">

                                    <ListGroupItem className="mb-3 mx-0">
                                        <div className="d-flex justify-content-between">
                                            <div className="flex-grow-1">
                                                <span className="postTitle">{post.title}</span>
                                                <div>{post.body}</div>
                                                <div className="mt-1">
                                                    <strong className="mr-1">Tags:</strong>{post
                                                        .tags
                                                        .map((tag) => (
                                                            <Badge color="warning" className="mr-2">{tag}</Badge>
                                                        ))}
                                                </div>
                                                <div>
                                                    <strong className="mr-1">Date created:</strong>
                                                    <Moment format="YYYY-MM-DD HH:mm">{post.dateCreated}</Moment>
                                                </div>
                                                <div>
                                                    <strong className="mr-1">Rating:</strong>
                                                    <span className="mr-1">{post.rating}</span>
                                                    <Button
                                                        outline
                                                        size="sm"
                                                        className="ratingCtrlBtn mr-1"
                                                        color="danger"
                                                        onClick={this
                                                        .changePostRating
                                                        .bind(this, post, "increase")}><FontAwesomeIcon icon={faPlus}/></Button>
                                                    <Button
                                                        outline
                                                        size="sm"
                                                        className="ratingCtrlBtn mr-1"
                                                        color="danger"
                                                        onClick={this
                                                        .changePostRating
                                                        .bind(this, post, "decrease")}><FontAwesomeIcon icon={faMinus}/></Button>
                                                </div>
                                            </div>
                                            <div className="actionIconsDiv"><FontAwesomeIcon
                                                className="actionBtn"
                                                icon={faPencilAlt}
                                                onClick={this
                                    .editPost
                                    .bind(this, post)}/><FontAwesomeIcon
                                                className="actionBtn"
                                                icon={faTrash}
                                                onClick={this
                                    .removePost
                                    .bind(this, post._id)}/></div>
                                        </div>
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </div>
                    </TransitionGroup>
                </ListGroup>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Add New Post
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="post">Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="postTitle"
                                    onChange={this.onChangeTitle}
                                    value={this.state.modifiedTitle}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="post">Body</Label>
                                <Input
                                    type="textarea"
                                    name="body"
                                    id="postBody"
                                    onChange={this.onChangeBody}
                                    value={this.state.modifiedBody}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="post">Tags</Label>
                                <Input
                                    type="text"
                                    name="tags"
                                    id="postTags"
                                    onChange={this.onChangeTags}
                                    value={this
                                    .state
                                    .modifiedTags
                                    .join(";")}/>
                                <span>Note: Tags should be separated with a semi-colon (;)</span>
                            </FormGroup>
                            <Button color="warning" className="mg-2" block>Save</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

BulletinList.propTypes = {
    getProps: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({post: state.post})

export default connect(mapStateToProps, {getPosts, deletePost, editPost, changeRating, searchByTags})(BulletinList);