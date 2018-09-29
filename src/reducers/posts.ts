import produce from 'immer';
import _ from 'lodash';
import { AnyAction } from 'redux';
import { PostsActions } from '../actions';
import { IPostDetails } from '../types/api';
import { IState } from '../types/state';

export interface IPost {
  postDetails: IPostDetails;
  isFirstFetch: boolean;
  isLoading: boolean;
  isSendingComment: boolean;
}

export interface IPostsState {
  [field: string]: IPost;
}

const INITIAL_POST_STATE = {
  postDetails: {},
  isFirstFetch: true,
  isLoading: false,
  isSendingComment: false,
};

const INITIAL_STATE = {};

const posts = produce<IPostsState>((draft: IPostsState, action: AnyAction) => {
  switch (action.type) {
    case PostsActions.INJECT_NEW_POSTS: {
      action.payload.forEach((postDetails: IPostDetails) => {
        const postField = createPostBadge(postDetails.id);
        draft[postField] = {
          ...INITIAL_POST_STATE,
          ...draft[postField],
          postDetails,
          isFirstFetch: false,
        };
      });
      return;
    }
    case PostsActions.GET_POST_DETAILS: {
      const postField = createPostBadge(action.payload.postID);
      draft[postField] = {
        ...INITIAL_POST_STATE,
        ...draft[postField],
        isLoading: true,
      };
      return;
    }
    case PostsActions.GET_POST_DETAILS_SUCCESS: {
      const postField = createPostBadge(action.meta.previousAction.payload.postID);
      draft[postField].postDetails = action.payload.data;
      draft[postField].isFirstFetch = false;
      draft[postField].isLoading = false;
      return;
    }
    case PostsActions.COMMENT: {
      const postField = createPostBadge(action.payload.postID);
      draft[postField].isSendingComment = true;
      return;
    }
    case PostsActions.COMMENT_SUCCESS: {
      const postField = createPostBadge(action.meta.previousAction.payload.postID);
      draft[postField].postDetails.comments_count += 1;
      draft[postField].isSendingComment = false;
      return;
    }
    case PostsActions.COMMENT_FAIL: {
      const postField = createPostBadge(action.meta.previousAction.payload.postID);
      draft[postField].isSendingComment = false;
      return;
    }
    case PostsActions.LIKE_OR_DISLIKE: {
      const postField = createPostBadge(action.payload.postID);
      draft[postField].postDetails.likes_count += draft[postField].postDetails.is_liked ? -1 : 1;
      draft[postField].postDetails.is_liked = !draft[postField].postDetails.is_liked;
      return;
    }
  }
}, INITIAL_STATE);

export const selectPosts = (state: IState) => state.posts;

const createPostBadge = (postID: number) => `post_${postID}`;

const checkPostProperty = (state: IState, postID: number) =>
  _.has(selectPosts(state), createPostBadge(postID));

const getPostProperty = (state: IState, postID: number) => {
  const postProperty = createPostBadge(postID);
  if (checkPostProperty(state, postID)) {
    return selectPosts(state)[postProperty];
  }
  return INITIAL_POST_STATE;
};
export const selectPostInfo = (state: IState, postID: number) =>
  getPostProperty(state, postID).postDetails;
export const selectPostInfoIsFirstFetch = (state: IState, postID: number) =>
  getPostProperty(state, postID).isFirstFetch;
export const selectPostInfoIsLoading = (state: IState, postID: number) =>
  getPostProperty(state, postID).isLoading;
export const selectIsSendingComment = (state: IState, postID: number) =>
  getPostProperty(state, postID).isSendingComment;

export default posts;
