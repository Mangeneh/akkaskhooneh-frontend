import _ from 'lodash';
import GlobalActions from '../actions';
import { PostsActions } from '../actions/PostsActions';

const INITIAL_SELF_PHOTOS_STATE = {
  selfPhotos: [],
  selfPhotosNextPage: 1,
  selfPhotosTotalPages: 1,
  selfPhotosIsLoading: false,
};

const INITIAL_HOME_POSTS_STATE = {
  homePosts: [],
  homePostsNextPage: 1,
  homePostsTotalPages: 1,
  homePostsIsLoading: false,
};

const INITIAL_OTHERS_PHOTOS_STATE = {
  othersPhotos: [],
  othersPhotosNextPage: 1,
  othersPhotosTotalPages: 1,
  othersPhotosIsLoading: false,
};

const INITIAL_OPEN_POST_STATE = {
  postInfo: {},
  postInfoIsLoading: false,
  comments: [],
  commentsNextPage: 1,
  commentsTotalPages: 1,
  commentsIsLoading: false,
  isSendingComment: false,
};

const INITIAL_TAGS_PHOTOS_STATE = {
  tagsPhotos: [],
  tagsPhotosNextPage: 1,
  tagsPhotosTotalPages: 1,
  tagsPhotosIsLoading: false,
};

const INITIAL_STATE = {
  ...INITIAL_SELF_PHOTOS_STATE,
  ...INITIAL_HOME_POSTS_STATE,
  chosenPostID: 0,
};

export default (state = INITIAL_STATE, action) => {
  const {
    GET_HOME_POSTS_NEXT_PAGE,
    GET_HOME_POSTS_NEXT_PAGE_FAIL,
    GET_HOME_POSTS_NEXT_PAGE_SUCCESS,
    //
    GET_SELF_PHOTOS_NEXT_PAGE,
    GET_SELF_PHOTOS_NEXT_PAGE_SUCCESS,
    GET_SELF_PHOTOS_NEXT_PAGE_FAIL,
    //
    GET_OPEN_POST_COMMENTS_NEXT_PAGE,
    GET_OPEN_POST_COMMENTS_NEXT_PAGE_SUCCESS,
    GET_OPEN_POST_COMMENTS_NEXT_PAGE_FAIL,
    //
    RESET_SELF_PHOTOS,
    RESET_HOME_POSTS,
    RESET_OTHERS_PHOTOS,
    //
    GET_POST_INFO,
    GET_POST_INFO_SUCCESS,
    GET_POST_INFO_FAIL,
    //
    COMMENT,
    COMMENT_SUCCESS,
    COMMENT_FAIL,
    //
    CHOOSE_POST,
    LIKE_OR_DISLIKE_SUCCESS,
    //
    REFRESH_SELF_PHOTOS,
    REFRESH_SELF_PHOTOS_SUCCESS,
    //
    REFRESH_HOME_POSTS,
    REFRESH_HOME_POSTS_SUCCESS,
    REFRESH_HOME_POSTS_FAIL,
    //
    REFRESH_OPEN_POST_COMMENTS,
    REFRESH_OPEN_POST_COMMENTS_SUCCESS,
    REFRESH_OPEN_POST_COMMENTS_FAIL,
    //
    REFRESH_TAGS_POSTS,
    REFRESH_TAGS_POSTS_SUCCESS,
    REFRESH_TAGS_POSTS_FAIL,
    //
    GET_TAGS_PHOTOS_NEXT_PAGE,
    GET_TAGS_PHOTOS_NEXT_PAGE_FAIL,
    GET_TAGS_PHOTOS_NEXT_PAGE_SUCCESS,
  } = PostsActions;
  switch (action.type) {
    case GET_HOME_POSTS_NEXT_PAGE:
      return {
        ...state,
        homePostsIsLoading: true,
      };
    case GET_HOME_POSTS_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        homePosts: state.homePosts.concat(action.payload.data.results),
        homePostsNextPage: state.homePostsNextPage + 1,
        homePostsTotalPages: action.payload.data.total_pages,
        homePostsIsLoading: false,
      };
    //
    case GET_SELF_PHOTOS_NEXT_PAGE:
      return {
        ...state,
        selfPhotosIsLoading: true,
      };
    case GET_SELF_PHOTOS_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        selfPhotos: state.selfPhotos.concat(action.payload.data.results),
        selfPhotosNextPage: state.selfPhotosNextPage + 1,
        selfPhotosTotalPages: action.payload.data.total_pages,
        selfPhotosIsLoading: false,
      };
    //
    case GET_POST_INFO: {
      const postField = createPostBadge(action.payload.postID);
      return {
        ...state,
        [postField]: { ...INITIAL_OPEN_POST_STATE, ...state[postField] },
      };
    }
    case GET_POST_INFO_SUCCESS: {
      const postField = createPostBadge(action.meta.previousAction.payload.postID);
      return {
        ...state,
        [postField]: {
          ...state[postField],
          postInfo: action.payload.data,
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
      return {
        ...state,
        [postField]: {
          ...state[postField],
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
          commentsIsLoading: true,
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
          commentsIsLoading: false,
        },
      };
    }
    case REFRESH_OPEN_POST_COMMENTS_FAIL: {
      const postField = createPostBadge(action.meta.previousAction.payload.postID);
      return {
        ...state,
        [postField]: {
          ...state[postField],
          commentsIsLoading: false,
        },
      };
    }
    //
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
    case CHOOSE_POST:
      return {
        ...state,
        chosenPostID: action.payload,
      };
    //
    case LIKE_OR_DISLIKE_SUCCESS: {
      const chosenPost = state.homePosts.find(post => post.id === state.chosenPostID);
      const chosenPostIndex = state.homePosts.indexOf(chosenPost);
      const newLikes = chosenPost.likes + (action.payload.data.liked ? 1 : -1);
      const newPost = {
        ...chosenPost,
        likes: newLikes,
        is_liked: action.payload.data.liked,
      };
      const newHomePosts = [
        ...state.homePosts.slice(0, chosenPostIndex),
        newPost,
        ...state.homePosts.slice(chosenPostIndex + 1),
      ];
      return {
        ...state,
        homePosts: newHomePosts,
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
    case REFRESH_TAGS_POSTS: {
      const tagField = createTagBadge(action.payload.tagID);
      return {
        ...state,
        [tagField]: { ...INITIAL_TAGS_PHOTOS_STATE, ...state[tagField] },
      };
    }
    case REFRESH_TAGS_POSTS_SUCCESS: {
      const tagField = createTagBadge(action.meta.previousAction.payload.tagID);
      return {
        ...state,
        [tagField]: {
          ...state[tagField],
          tagsPhotos: action.payload.data.results,
          tagsPhotosNextPage: 2,
          tagsPhotosTotalPages: action.payload.data.total_pages,
          tagsPhotosIsLoading: false,
        },
      };
    }
    //
    case REFRESH_SELF_PHOTOS:
      return {
        ...state,
        selfPhotosIsLoading: true,
      };
    case REFRESH_SELF_PHOTOS_SUCCESS:
      return {
        ...state,
        selfPhotos: action.payload.data.results,
        selfPhotosNextPage: 2,
        selfPhotosTotalPages: action.payload.data.total_pages,
        selfPhotosIsLoading: false,
      };
    //
    case REFRESH_HOME_POSTS:
      return {
        ...state,
        homePostsIsLoading: true,
      };
    case REFRESH_HOME_POSTS_SUCCESS:
      return {
        ...state,
        homePosts: action.payload.data.results,
        homePostsNextPage: 2,
        homePostsTotalPages: action.payload.data.total_pages,
        homePostsIsLoading: false,
      };
    //
    case RESET_SELF_PHOTOS:
      return { ...state, ...INITIAL_SELF_PHOTOS_STATE };
    case RESET_HOME_POSTS:
      return { ...state, ...INITIAL_HOME_POSTS_STATE };
    case RESET_OTHERS_PHOTOS:
      return { ...state, ...INITIAL_OTHERS_PHOTOS_STATE };
    case GlobalActions.RESET_EVERYTHING:
      return INITIAL_STATE;
    default:
      return state;
  }
};

const createPostBadge = postID => `post${postID}`;
const createTagBadge = tagID => `tag${tagID}`;

export const selectSelfPhotos = state => state.posts.selfPhotos;
export const selectSelfPhotosNextPage = state => state.posts.selfPhotosNextPage;
export const selectSelfPhotosTotalPages = state => state.posts.selfPhotosTotalPages;
export const selectSelfPhotosIsLoading = state => state.posts.selfPhotosIsLoading;

export const selectHomePosts = state => state.posts.homePosts;
export const selectHomePostsNextPage = state => state.posts.homePostsNextPage;
export const selectHomePostsTotalPages = state => state.posts.homePostsTotalPages;
export const selectHomePostsIsLoading = state => state.posts.homePostsIsLoading;

const checkPostProperty = (state, postID) => _.has(state.posts, createPostBadge(postID));
const getPostProperty = (state, postID) => {
  const postProperty = createPostBadge(postID);
  if (checkPostProperty(state, postID)) {
    return state.posts[postProperty];
  }
  return INITIAL_OPEN_POST_STATE;
};
export const selectPostInfo = (state, postID) => getPostProperty(state, postID).postInfo;
export const selectComments = (state, postID) => getPostProperty(state, postID).comments;
export const selectCommentsNextPage = (state, postID) => getPostProperty(state, postID).commentsNextPage;
export const selectCommentsTotalPages = (state, postID) => getPostProperty(state, postID).commentsTotalPages;
export const selectCommentsIsLoading = (state, postID) => getPostProperty(state, postID).commentsIsLoading;
export const selectIsSendingComment = (state, postID) => getPostProperty(state, postID).isSendingComment;

const checkTagProperty = (state, tagID) => _.has(state.posts, createTagBadge(tagID));
const getTagProperty = (state, tagID) => {
  const tagProperty = createTagBadge(tagID);
  if (checkTagProperty(state, tagID)) {
    return state.posts[tagProperty];
  }
  return INITIAL_TAGS_PHOTOS_STATE;
};
export const selectTagsPhotos = (state, tagID) => getTagProperty(state, tagID).tagsPhotos;
export const selectTagsPhotosNextPage = (state, tagID) => getTagProperty(state, tagID).tagsPhotosNextPage;
export const selectTagsPhotosTotalPages = (state, tagID) => getTagProperty(state, tagID).tagsPhotosTotalPages;
export const selectTagsPhotosIsLoading = (state, tagID) => getTagProperty(state, tagID).tagsPhotosIsLoading;

export const selectOthersPhotos = state => state.posts.othersPhotos;
export const selectOthersPhotosNextPage = state => state.posts.othersPhotosNextPage;
export const selectOthersPhotosTotalPages = state => state.posts.othersPhotosTotalPages;

export const selectOthersPhotosIsLoading = state => state.posts.othersPhotosIsLoading;
export const selectChosenPostID = state => state.posts.chosenPostID;
