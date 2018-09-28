import _ from 'lodash';
import { PostsActions, UsersActions } from '../actions';
import {
  extractCommentsCount,
  extractIsLiked,
  extractLikesCount,
  extractPostID,
} from '../helpers';

const INITIAL_OPEN_POST_STATE = {
  postInfo: {},
  postInfoIsFirstFetch: true,
  postInfoIsLoading: false,
};

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  const {
    GET_POST_INFO,
    GET_POST_INFO_SUCCESS,
    GET_POST_INFO_FAIL,
    COMMENT,
    COMMENT_SUCCESS,
    COMMENT_FAIL,
    LIKE_OR_DISLIKE,
    LIKE_OR_DISLIKE_SUCCESS,
    LIKE_OR_DISLIKE_FAIL,
    INJECT_NEW_POSTS,
  } = PostsActions;
  switch (action.type) {
    case INJECT_NEW_POSTS: {
      return {
        ...state,
        ...injectNewPosts(action.payload, state),
      };
    }
    case GET_POST_INFO: {
      const postField = createPostBadge(action.payload.postID);
      return {
        ...state,
        [postField]: {
          ...INITIAL_OPEN_POST_STATE,
          ...state[postField],
          postInfoIsLoading: true,
        },
      };
    }
    case GET_POST_INFO_SUCCESS: {
      const postField = createPostBadge(action.meta.previousAction.payload.postID);
      return {
        ...state,
        [postField]: {
          ...state[postField],
          postInfo: action.payload.data,
          postInfoIsFirstFetch: false,
          postInfoIsLoading: false,
        },
      };
    }
    case COMMENT: {
      const postField = createPostBadge(action.payload.postID);
      return {
        ...state,
        [postField]: {
          ...state[postField],
          isSendingComment: true,
        },
      };
    }
    case COMMENT_SUCCESS: {
      const postField = createPostBadge(action.meta.previousAction.payload.postID);
      const chosenPostInfo = state[postField].postInfo;
      const newPostInfo = {
        ...chosenPostInfo,
        comments_count: extractCommentsCount(state[postField].postInfo) + 1,
      };
      return {
        ...state,
        [postField]: {
          ...state[postField],
          postInfo: newPostInfo,
          isSendingComment: false,
        },
      };
    }
    case COMMENT_FAIL: {
      const postField = createPostBadge(action.meta.previousAction.payload.postID);
      return {
        ...state,
        [postField]: {
          ...state[postField],
          isSendingComment: false,
        },
      };
    }
    case LIKE_OR_DISLIKE: {
      const postField = createPostBadge(action.payload.postID);
      const chosenPostInfo = state[postField].postInfo;
      const newLikes = extractLikesCount(chosenPostInfo) + (extractIsLiked(chosenPostInfo) ? -1 : 1);
      const newPostInfo = {
        ...chosenPostInfo,
        likes_count: newLikes,
        is_liked: !chosenPostInfo.is_liked,
      };
      return {
        ...state,
        [postField]: {
          ...state[postField],
          postInfo: newPostInfo,
        },
      };
    }
    default:
      return state;
  }
};

const injectNewPosts = (newPosts, state) => {
  if (newPosts.length === 0) {
    return {};
  }
  if (newPosts.length === 1) {
    const postField = createPostBadge(extractPostID(newPosts[0]));
    return {
      [postField]: {
        ...INITIAL_OPEN_POST_STATE,
        ...state[postField],
        postInfo: {
          ...newPosts[0],
        },
        postInfoIsFirstFetch: false,
      },
    };
  }
  return newPosts.reduce((accumulator, currentValue, currentIndex) => {
    if (currentIndex === 1) {
      const firstPostField = createPostBadge(extractPostID(accumulator));
      const secondPostField = createPostBadge(extractPostID(currentValue));
      return {
        [firstPostField]: {
          ...INITIAL_OPEN_POST_STATE,
          ...state[firstPostField],
          postInfo: {
            ...accumulator,
          },
          postInfoIsFirstFetch: false,
        },
        [secondPostField]: {
          ...INITIAL_OPEN_POST_STATE,
          ...state[secondPostField],
          postInfo: {
            ...currentValue,
          },
          postInfoIsFirstFetch: false,
        },
      };
    }
    const postField = createPostBadge(extractPostID(currentValue));
    return {
      ...accumulator,
      [postField]: {
        ...INITIAL_OPEN_POST_STATE,
        ...state[postField],
        postInfo: {
          ...currentValue,
        },
        postInfoIsFirstFetch: false,
      },
    };
  }, {});
};

export const selectPosts = state => state.posts;

const createPostBadge = postID => `post_${postID}`;

const checkPostProperty = (state, postID) => _.has(selectPosts(state), createPostBadge(postID));
const getPostProperty = (state, postID) => {
  const postProperty = createPostBadge(postID);
  if (checkPostProperty(state, postID)) {
    return selectPosts(state)[postProperty];
  }
  return INITIAL_OPEN_POST_STATE;
};
export const selectPostInfo = (state, postID) => getPostProperty(state, postID).postInfo;
export const selectPostInfoIsFirstFetch = (state, postID) => getPostProperty(state, postID).postInfoIsFirstFetch;
export const selectPostInfoIsLoading = (state, postID) => getPostProperty(state, postID).postInfoIsLoading;
export const selectIsSendingComment = (state, postID) => getPostProperty(state, postID).isSendingComment;
