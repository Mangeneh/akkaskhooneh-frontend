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
  homePostInfo: {},
  postInfoIsLoading: false,
  sendCommentLoading: false,
};

const INITIAL_OTHERS_PHOTOS_STATE = {
  othersPhotos: [],
  othersPhotosNextPage: 1,
  othersPhotosTotalPages: 1,
  othersPhotosIsLoading: false,
};

const INITIAL_STATE = {
  ...INITIAL_SELF_PHOTOS_STATE,
  ...INITIAL_HOME_POSTS_STATE,
  ...INITIAL_OTHERS_PHOTOS_STATE,
  chosenPostID: 0,
};

export default (state = INITIAL_STATE, action) => {
  const {
    GET_HOME_POSTS_NEXT_PAGE,
    GET_HOME_POSTS_NEXT_PAGE_SUCCESS,
    GET_SELF_PHOTOS_NEXT_PAGE,
    GET_SELF_PHOTOS_NEXT_PAGE_FAIL,
    GET_SELF_PHOTOS_NEXT_PAGE_SUCCESS,
    RESET_HOME_POSTS,
    RESET_OTHERS_PHOTOS,
    RESET_SELF_PHOTOS,
    GET_POST_INFO,
    GET_POST_INFO_SUCCESS,
    GET_POST_INFO_FAIL,
    COMMENT,
    COMMENT_SUCCESS,
    COMMENT_FAIL,
    CHOOSE_POST,
    LIKE_OR_DISLIKE_SUCCESS,
  } = PostsActions;
  switch (action.type) {
    case COMMENT:
      return {
        ...state,
        sendCommentLoading: true,
      };
    case COMMENT_SUCCESS:
      return {
        ...state,
        sendCommentLoading: false,
      };
    case GET_POST_INFO:
      return {
        ...state,
        postInfoIsLoading: true,
      };
    case GET_POST_INFO_SUCCESS:
      return {
        ...state,
        homePostInfo: action.payload.data,
        postInfoIsLoading: false,
      };
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
    case CHOOSE_POST:
      console.warn(action.payload);
      return {
        ...state,
        chosenPostID: action.payload,
      };
    case LIKE_OR_DISLIKE_SUCCESS:
      const chosenPost = state.homePosts.find(post => post.id === state.chosenPostID);
      const chosenPostIndex = state.homePosts.indexOf(chosenPost);
      const newLikes = chosenPost.likes + (action.payload.data.liked ? 1 : -1);
      const newPost = {
        ...chosenPost,
        likes: newLikes,
      };
      const newHomePosts = [...state.homePosts.slice(0, chosenPostIndex), newPost, ...state.homePosts.slice(chosenPostIndex + 1)];
      return {
        ...state,
        homePosts: newHomePosts,
      };
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

export const selectSelfPhotos = state => state.posts.selfPhotos;
export const selectSelfPhotosNextPage = state => state.posts.selfPhotosNextPage;
export const selectSelfPhotosTotalPages = state => state.posts.selfPhotosTotalPages;
export const selectSelfPhotosIsLoading = state => state.posts.selfPhotosIsLoading;

export const selectHomePosts = state => state.posts.homePosts;
export const selectHomePostsNextPage = state => state.posts.homePostsNextPage;
export const selectHomePostsTotalPages = state => state.posts.homePostsTotalPages;
export const selectHomePostsIsLoading = state => state.posts.homePostsIsLoading;
export const selectPostInfo = state => state.posts.homePostInfo;
export const selectCommentLoading = state => state.posts.sendCommentLoading;

export const selectOthersPhotos = state => state.posts.othersPhotos;
export const selectOthersPhotosNextPage = state => state.posts.othersPhotosNextPage;
export const selectOthersPhotosTotalPages = state => state.posts.othersPhotosTotalPages;
export const selectOthersPhotosIsLoading = state => state.posts.othersPhotosIsLoading;

export const selectChosenPostID = state => state.posts.chosenPostID;
