import _ from 'lodash';
import { PostsActions, UsersActions } from '../actions';
import { extractCommentsCount, extractIsLiked, extractLikesCount, extractPostID } from '../helpers';
import { selectPosts } from './index';

const INITIAL_USER_PHOTOS_STATE = {
  userPhotos: [],
  userPhotosNextPage: 1,
  userPhotosTotalPages: 1,
  userPhotosIsFirstFetch: true,
  userPhotosIsRefreshing: false,
  userPhotosIsLoading: false,
};

const INITIAL_HOME_POSTS_STATE = {
  homePosts: [],
  homePostsNextPage: 1,
  homePostsTotalPages: 1,
  homePostsIsFirstFetch: true,
  homePostsIsRefreshing: false,
  homePostsIsLoading: false,
};

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

const INITIAL_TAGS_PHOTOS_STATE = {
  tagsPhotos: [],
  tagsPhotosNextPage: 1,
  tagsPhotosTotalPages: 1,
  tagsPhotosIsFirstFetch: true,
  tagsPhotosIsRefreshing: false,
  tagsPhotosIsLoading: false,
};

const INITIAL_BOARDS_PHOTOS_STATE = {
  boardsPhotos: [],
  boardsPhotosNextPage: 1,
  boardsPhotosTotalPages: 1,
  boardsPhotosIsFirstFetch: true,
  boardsPhotosIsRefreshing: false,
  boardsPhotosIsLoading: false,
};

const INITIAL_STATE = {
  home: INITIAL_HOME_POSTS_STATE,
};

export default (state = INITIAL_STATE, action) => {
  const {
    GET_USER_PHOTOS_NEXT_PAGE,
    GET_USER_PHOTOS_NEXT_PAGE_SUCCESS,
    //
    REFRESH_USER_PHOTOS,
    REFRESH_USER_PHOTOS_SUCCESS,
    //
    GET_HOME_POSTS_NEXT_PAGE,
    GET_HOME_POSTS_NEXT_PAGE_SUCCESS,
    //
    GET_OPEN_POST_COMMENTS_NEXT_PAGE,
    GET_OPEN_POST_COMMENTS_NEXT_PAGE_SUCCESS,
    //
    GET_BOARDS_PHOTOS_NEXT_PAGE,
    GET_BOARDS_PHOTOS_NEXT_PAGE_FAIL,
    GET_BOARDS_PHOTOS_NEXT_PAGE_SUCCESS,
    //
    REFRESH_BOARDS_PHOTOS,
    REFRESH_BOARDS_PHOTOS_FAIL,
    REFRESH_BOARDS_PHOTOS_SUCCESS,
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
    REFRESH_HOME_POSTS,
    REFRESH_HOME_POSTS_SUCCESS,
    //
    REFRESH_OPEN_POST_COMMENTS,
    REFRESH_OPEN_POST_COMMENTS_SUCCESS,
    REFRESH_OPEN_POST_COMMENTS_FAIL,
    //
    REFRESH_TAGS_PHOTOS,
    REFRESH_TAGS_PHOTOS_SUCCESS,
    //
    GET_TAGS_PHOTOS_NEXT_PAGE,
    GET_TAGS_PHOTOS_NEXT_PAGE_SUCCESS,
  } = PostsActions;
  switch (action.type) {
    case REFRESH_USER_PHOTOS: {
      const usernameField = createUserBadge(action.payload.username);
      return {
        ...state,
        [usernameField]: {
          ...INITIAL_USER_PHOTOS_STATE,
          ...state[usernameField],
          userPhotosIsRefreshing: true,
        },
      };
    }
    case REFRESH_USER_PHOTOS_SUCCESS: {
      const usernameField = createUserBadge(action.meta.previousAction.payload.username);
      return {
        ...state,
        [usernameField]: {
          ...state[usernameField],
          userPhotos: action.payload.data.results,
          userPhotosNextPage: 2,
          userPhotosTotalPages: action.payload.data.total_pages,
          userPhotosIsFirstFetch: false,
          userPhotosIsRefreshing: false,
        },
      };
    }
    case GET_USER_PHOTOS_NEXT_PAGE: {
      const usernameField = createUserBadge(action.payload.username);
      return {
        ...state,
        [usernameField]: {
          ...state[usernameField],
          userPhotosIsLoading: true,
        },
      };
    }
    case GET_USER_PHOTOS_NEXT_PAGE_SUCCESS: {
      const usernameField = createUserBadge(action.meta.previousAction.payload.username);
      return {
        ...state,
        [usernameField]: {
          ...state[usernameField],
          userPhotos: state[usernameField].userPhotos.concat(action.payload.data.results),
          userPhotosNextPage: state[usernameField].userPhotosNextPage + 1,
          userPhotosTotalPages: action.payload.data.total_pages,
          userPhotosIsLoading: false,
        },
      };
    }
    //
    case REFRESH_HOME_POSTS:
      return {
        ...state,
        home: {
          ...state.home,
          homePostsIsRefreshing: true,
        },
      };
    case REFRESH_HOME_POSTS_SUCCESS:
      return {
        ...state,
        home: {
          ...state.home,
          homePosts: action.payload.data.results,
          homePostsNextPage: 2,
          homePostsTotalPages: action.payload.data.total_pages,
          homePostsIsFirstFetch: false,
          homePostsIsRefreshing: false,
        },
        ...injectNewPosts(action.payload.data.results, state),
      };
    case GET_HOME_POSTS_NEXT_PAGE:
      return {
        ...state,
        home: {
          ...state.home,
          homePostsIsLoading: true,
        },
      };
    case GET_HOME_POSTS_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        home: {
          ...state.home,
          homePosts: state.home.homePosts.concat(action.payload.data.results),
          homePostsNextPage: state.home.homePostsNextPage + 1,
          homePostsTotalPages: action.payload.data.total_pages,
          homePostsIsLoading: false,
        },
        ...injectNewPosts(action.payload.data.results, state),
      };
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
    // Tags
    case GET_TAGS_PHOTOS_NEXT_PAGE: {
      const tagField = createTagBadge(action.payload.tagID);
      return {
        ...state,
        [tagField]: {
          ...state[tagField],
          tagsPhotosIsLoading: true,
        },
      };
    }
    case GET_TAGS_PHOTOS_NEXT_PAGE_SUCCESS: {
      const tagField = createTagBadge(action.meta.previousAction.payload.tagID);
      return {
        ...state,
        [tagField]: {
          ...state[tagField],
          tagsPhotos: state[tagField].tagsPhotos.concat(action.payload.data.results),
          tagsPhotosNextPage: state[tagField].tagsPhotosNextPage + 1,
          tagsPhotosTotalPages: action.payload.data.total_pages,
          tagsPhotosIsLoading: false,
        },
      };
    }
    case REFRESH_TAGS_PHOTOS: {
      const tagField = createTagBadge(action.payload.tagID);
      return {
        ...state,
        [tagField]: {
          ...INITIAL_TAGS_PHOTOS_STATE,
          ...state[tagField],
          tagsPhotosIsRefreshing: true,
        },
      };
    }
    case REFRESH_TAGS_PHOTOS_SUCCESS: {
      const tagField = createTagBadge(action.meta.previousAction.payload.tagID);
      return {
        ...state,
        [tagField]: {
          ...state[tagField],
          tagsPhotos: action.payload.data.results,
          tagsPhotosNextPage: 2,
          tagsPhotosTotalPages: action.payload.data.total_pages,
          tagsPhotosIsFirstFetch: false,
          tagsPhotosIsRefreshing: false,
        },
      };
    }
    //
    case REFRESH_BOARDS_PHOTOS: {
      const boardField = createBoardBadge(action.payload.boardID);
      return {
        ...state,
        [boardField]: {
          ...INITIAL_BOARDS_PHOTOS_STATE,
          ...state[boardField],
          boardsPhotosIsRefreshing: true,
        },
      };
    }
    case REFRESH_BOARDS_PHOTOS_SUCCESS: {
      const boardField = createBoardBadge(action.meta.previousAction.payload.boardID);
      return {
        ...state,
        [boardField]: {
          ...state[boardField],
          boardsPhotos: action.payload.data.results,
          boardsPhotosNextPage: 2,
          boardsPhotosTotalPages: action.payload.data.total_pages,
          boardsPhotosIsFirstFetch: false,
          boardsPhotosIsRefreshing: false,
        },
      };
    }
    case GET_BOARDS_PHOTOS_NEXT_PAGE: {
      const boardField = createBoardBadge(action.payload.boardID);
      return {
        ...state,
        [boardField]: {
          ...state[boardField],
          boardsPhotosIsLoading: true,
        },
      };
    }
    case GET_BOARDS_PHOTOS_NEXT_PAGE_SUCCESS: {
      const boardField = createBoardBadge(action.meta.previousAction.payload.boardID);
      return {
        ...state,
        [boardField]: {
          ...state[boardField],
          boardsPhotos: state[boardField].boardsPhotos.concat(action.payload.data.results),
          boardsPhotosNextPage: state[boardField].boardsPhotosNextPage + 1,
          boardsPhotosTotalPages: action.payload.data.total_pages,
          boardsPhotosIsLoading: false,
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

const injectNewPosts = (newPosts, state) => newPosts.reduce((accumulator, currentValue, currentIndex) => {
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
});

const selectHome = state => selectPosts(state).home;

const createUserBadge = username => username || 'me';
const createPostBadge = postID => `post${postID}`;
const createTagBadge = tagID => `tag${tagID}`;
const createBoardBadge = boardID => `board${boardID}`;

const checkUserProperty = (state, username) => _.has(selectPosts(state), createUserBadge(username));
const getUserProperty = (state, username) => {
  const userProperty = createUserBadge(username);
  if (checkUserProperty(state, username)) {
    return selectPosts(state)[userProperty];
  }
  return INITIAL_USER_PHOTOS_STATE;
};
export const selectUserPhotos = (state, username) => getUserProperty(state, username).userPhotos;
export const selectUserPhotosNextPage = (state, username) => getUserProperty(state, username).userPhotosNextPage;
export const selectUserPhotosTotalPages = (state, username) => getUserProperty(state, username).userPhotosTotalPages;
export const selectUserPhotosIsFirstFetch = (state, username) => getUserProperty(state, username).userPhotosIsFirstFetch;
export const selectUserPhotosIsRefreshing = (state, username) => getUserProperty(state, username).userPhotosIsRefreshing;
export const selectUserPhotosIsLoading = (state, username) => getUserProperty(state, username).userPhotosIsLoading;

export const selectHomePosts = state => selectHome(state).homePosts;
export const selectHomePostsNextPage = state => selectHome(state).homePostsNextPage;
export const selectHomePostsTotalPages = state => selectHome(state).homePostsTotalPages;
export const selectHomePostsIsRefreshing = state => selectHome(state).homePostsIsRefreshing;
export const selectHomePostsIsFirstFetch = state => selectHome(state).homePostsIsFirstFetch;
export const selectHomePostsIsLoading = state => selectHome(state).homePostsIsLoading;

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

const checkTagProperty = (state, tagID) => _.has(selectPosts(state), createTagBadge(tagID));
const getTagProperty = (state, tagID) => {
  const tagProperty = createTagBadge(tagID);
  if (checkTagProperty(state, tagID)) {
    return selectPosts(state)[tagProperty];
  }
  return INITIAL_TAGS_PHOTOS_STATE;
};
export const selectTagsPhotos = (state, tagID) => getTagProperty(state, tagID).tagsPhotos;
export const selectTagsPhotosNextPage = (state, tagID) => getTagProperty(state, tagID).tagsPhotosNextPage;
export const selectTagsPhotosTotalPages = (state, tagID) => getTagProperty(state, tagID).tagsPhotosTotalPages;
export const selectTagsPhotosIsRefreshing = (state, tagID) => getTagProperty(state, tagID).tagsPhotosIsRefreshing;
export const selectTagsPhotosIsFirstFetch = (state, tagID) => getTagProperty(state, tagID).tagsPhotosIsFirstFetch;
export const selectTagsPhotosIsLoading = (state, tagID) => getTagProperty(state, tagID).tagsPhotosIsLoading;

const checkBoardProperty = (state, boardID) => _.has(selectPosts(state), createBoardBadge(boardID));
const getBoardProperty = (state, boardID) => {
  const boardProperty = createBoardBadge(boardID);
  if (checkBoardProperty(state, boardID)) {
    return selectPosts(state)[boardProperty];
  }
  return INITIAL_BOARDS_PHOTOS_STATE;
};
export const selectBoardsPhotos = (state, boardID) => getBoardProperty(state, boardID).boardsPhotos;
export const selectBoardsPhotosTotalPages = (state, boardID) => getBoardProperty(state, boardID).boardsPhotosTotalPages;
export const selectBoardsPhotosNextPage = (state, boardID) => getBoardProperty(state, boardID).boardsPhotosNextPage;
export const selectBoardsPhotosIsRefreshing = (state, boardID) => getBoardProperty(state, boardID).boardsPhotosIsRefreshing;
export const selectBoardsPhotosIsFirstFetch = (state, boardID) => getBoardProperty(state, boardID).boardsPhotosIsFirstFetch;
export const selectBoardsPhotosIsLoading = (state, boardID) => getBoardProperty(state, boardID).boardsPhotosIsLoading;
