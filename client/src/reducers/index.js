import { combineReducers } from 'redux';
import postReducer from './post_reducer';

export default combineReducers({
    post: postReducer,
});