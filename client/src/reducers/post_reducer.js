import {GET_POSTS, ADD_POST, DELETE_POST, MODIFY_POST, UPDATE_RATING, FILTER_POSTS, POSTS_LOADING, ORDER_POSTS} from '../actions/types';

const initialState = {
    posts: [],
    fetchingData: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                fetchingData: false,
            }
        case ORDER_POSTS:
            const filterOption = action.payload;
            if (filterOption === "rating") {
                return {
                    ...state,
                    posts: state
                        .posts
                        .sort((a, b) => (a.rating < b.rating)
                            ? 1
                            : -1)
                };
            } else if (filterOption === "date") {
                return {
                    ...state,
                    posts: state
                        .posts
                        .sort((a, b) => (a.dateCreated < b.dateCreated)
                            ? 1
                            : -1)
                }
            } else if (filterOption === "title") {
                return {
                    ...state,
                    posts: state
                        .posts
                        .sort((a, b) => (a.title < b.title)
                            ? 1
                            : -1)
                }
            } else {
                return {
                    ...state
                };
            }
        case FILTER_POSTS:
            return {
                ...state,
                posts: state
                    .posts
                    .filter(post => post.tags.some(p => p === action.payload.toString()))
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state
                    .posts
                    .filter(post => post._id !== action.payload)
            };
        case ADD_POST:
            return {
                ...state,
                posts: [
                    action.payload, ...state.posts
                ]
            };
        case MODIFY_POST:
            for (var i = 0; i < state.posts.length; i++) {
                if (state.posts[i]._id === action.payload._id) {
                    state.posts[i].title = action.payload.title;
                    state.posts[i].body = action.payload.body;
                    state.posts[i].tags = action.payload.tags;
                }
            }
            return {
                ...state,
                posts: state.posts
            };
        case UPDATE_RATING:
            for (var x = 0; x < state.posts.length; x++) {
                if (state.posts[x]._id === action.payload._id) {
                    state.posts[x].rating = action.payload.rating;
                }
            }
            return {
                ...state,
                posts: state.posts
            };
        case POSTS_LOADING:
            return {
                ...state,
                fetchingData: true,
            }
        default:
            return state;
    }
}