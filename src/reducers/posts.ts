import produce from 'immer';
import _ from 'lodash';
import { AnyAction } from 'redux';
import { PostsActions } from '../actions';
import { PostDetails, State } from '../types';

export interface Post {
  postDetails: PostDetails;
  isFirstFetch: boolean;
  isLoading: boolean;
  isSendingComment: boolean;
}

export interface PostsState {
  [field: string]: Post;
}

const INITIAL_POST_STATE = {
  postDetails: {},
  isFirstFetch: true,
  isLoading: false,
  isSendingComment: false,
};

const INITIAL_STATE = {};

const posts = produce<PostsState>((draft: PostsState, action: AnyAction) => {
  switch (action.type) {
    case PostsActions.INJECT_NEW_POSTS: {
      action.payload.forEach((postDetails: PostDetails) => {
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

export const selectPosts = (state: State) => state.posts;

const createPostBadge = (postID: number) => `post_${postID}`;

const checkPostProperty = (state: State, postID: number) =>
  _.has(selectPosts(state), createPostBadge(postID));

const getPostProperty = (state: State, postID: number) => {
  const postProperty = createPostBadge(postID);
  if (checkPostProperty(state, postID)) {
    return selectPosts(state)[postProperty];
  }
  return INITIAL_POST_STATE;
};
export const selectPostInfo = (state: State, postID: number) =>
  getPostProperty(state, postID).postDetails;
export const selectPostInfoIsFirstFetch = (state: State, postID: number) =>
  getPostProperty(state, postID).isFirstFetch;
export const selectPostInfoIsLoading = (state: State, postID: number) =>
  getPostProperty(state, postID).isLoading;
export const selectIsSendingComment = (state: State, postID: number) =>
  getPostProperty(state, postID).isSendingComment;

export default posts;
