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
  comments: [],
  commentsNextPage: 1,
  commentsTotalPages: 1,
  commentsIsFirstFetch: true,
  commentsIsRefreshing: false,
  commentsIsLoading: false,
  isSendingComment: false,
};

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  const {
    GET_OPEN_POST_COMMENTS_NEXT_PAGE,
    GET_OPEN_POST_COMMENTS_NEXT_PAGE_SUCCESS,
    //
    GET_POST_INFO,
    GET_POST_INFO_SUCCESS,
    //
    COMMENT,
    COMMENT_SUCCESS,
    COMMENT_FAIL,
    //
    LIKE_OR_DISLIKE,
    //
    REFRESH_OPEN_POST_COMMENTS,
    REFRESH_OPEN_POST_COMMENTS_SUCCESS,
    REFRESH_OPEN_POST_COMMENTS_FAIL,
    //
    INJECT_NEW_POSTS,
  } = PostsActions;
  switch (action.type) {
    case INJECT_NEW_POSTS: {
      return {
        ...state,
        ...injectNewPosts(action.payload, state),
      };
    }
    //
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
    //
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
    //
    case REFRESH_OPEN_POST_COMMENTS: {
      const postField = createPostBadge(action.payload.postID);
      return {
        ...state,
        [postField]: {
          ...state[postField],
          commentsIsRefreshing: true,
        },
      };
    }
    case REFRESH_OPEN_POST_COMMENTS_SUCCESS: {
      const postField = createPostBadge(action.meta.previousAction.payload.postID);
      return {
        ...state,
        [postField]: {
          ...state[postField],
          comments: action.payload.data.results,
          commentsNextPage: 2,
          commentsTotalPages: action.payload.data.total_pages,
          commentsIsFirstFetch: false,
          commentsIsRefreshing: false,
        },
      };
    }
    case REFRESH_OPEN_POST_COMMENTS_FAIL: {
      const postField = createPostBadge(action.meta.previousAction.payload.postID);
      return {
        ...state,
        [postField]: {
          ...state[postField],
          commentsIsRefreshing: false,
        },
      };
    }
    case GET_OPEN_POST_COMMENTS_NEXT_PAGE: {
      const postField = createPostBadge(action.payload.postID);
      return {
        ...state,
        [postField]: {
          ...state[postField],
          commentsIsLoading: true,
        },
      };
    }
    case GET_OPEN_POST_COMMENTS_NEXT_PAGE_SUCCESS: {
      const postField = createPostBadge(action.meta.previousAction.payload.postID);
      return {
        ...state,
        [postField]: {
          ...state[postField],
          comments: state[postField].comments.concat(action.payload.data.results),
          commentsNextPage: state[postField].commentsNextPage + 1,
          commentsTotalPages: action.payload.data.total_pages,
          commentsIsLoading: false,
        },
      };
    }
    //
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
    //
    case UsersActions.SIGN_OUT:
      return INITIAL_STATE;
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
  },{});
};

export const selectPosts = state => state.posts;

const createPostBadge = postID => `post${postID}`;

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
export const selectComments = (state, postID) => getPostProperty(state, postID).comments;
export const selectCommentsNextPage = (state, postID) => getPostProperty(state, postID).commentsNextPage;
export const selectCommentsTotalPages = (state, postID) => getPostProperty(state, postID).commentsTotalPages;
export const selectCommentsIsLoading = (state, postID) => getPostProperty(state, postID).commentsIsLoading;
export const selectCommentsIsRefreshing = (state, postID) => getPostProperty(state, postID).commentsIsRefreshing;
export const selectCommentsIsFirstFetch = (state, postID) => getPostProperty(state, postID).commentsIsFirstFetch;
export const selectIsSendingComment = (state, postID) => getPostProperty(state, postID).isSendingComment;
