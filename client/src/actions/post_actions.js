import {
    GET_POSTS,
    ADD_POST,
    DELETE_POST,
    MODIFY_POST,
    UPDATE_RATING,
    FILTER_POSTS,
    POSTS_LOADING,
    ORDER_POSTS
} from './types'
import axios from 'axios';

export const getPosts = (filterOption) => dispatch => {

    dispatch(postsLoading());
    axios
        .get('/api')
        .then(res => dispatch({type: GET_POSTS, payload: res.data}));
}

export const deletePost = (Id) => dispatch => {
    axios
        .post(`/api/delete/${Id}`)
        .then(res => dispatch({type: DELETE_POST, payload: Id}));
    // return {type: DELETE_POST, payload: Id}
}

export const orderPosts = (filterOption) => {
    return {type: ORDER_POSTS, payload: filterOption}
}

export const addPost = (post) => dispatch => {
    axios
        .post('/api/', post)
        .then(res => dispatch({type: ADD_POST, payload: res.data}));
}

export const editPost = (post) => dispatch => {
    // return {type: MODIFY_POST, payload: post}
    axios
        .post(`/api/update/${post._id}`, post)
        .then(res => dispatch({type: MODIFY_POST, payload: post}));
}

export const changeRating = (post) => dispatch => {
    // return {type: UPDATE_RATING, payload: post}
    axios
    .post(`/api/updateRating/${post._id}`, post)
    .then(res => dispatch({type: UPDATE_RATING, payload: post}));
}

export const searchByTags = (searchKeyword) => {
    return {type: FILTER_POSTS, payload: searchKeyword}
}

export const postsLoading = () => {
    return {type: POSTS_LOADING}
}