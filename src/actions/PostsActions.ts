import { ActionCreator } from 'redux';
import { RequestMethods, Server } from '../config';
import { PostAction, PostDetails } from '../types';

export enum PostsActions {
  INJECT_NEW_POSTS = 'INJECT_NEW_POSTS',
  GET_POST_DETAILS = 'GET_POST_DETAILS',
  GET_POST_DETAILS_SUCCESS = 'GET_POST_DETAILS_SUCCESS',
  // GET_POST_DETAILS_FAIL = 'GET_POST_DETAILS_Fail',
  LIKE_OR_DISLIKE = 'LIKE_OR_DISLIKE',
  // LIKE_OR_DISLIKE_SUCCESS = 'LIKE_OR_DISLIKE_SUCCESS',
  // LIKE_OR_DISLIKE_FAIL = 'LIKE_OR_DISLIKE_FAIL',
  COMMENT = 'COMMENT',
  COMMENT_SUCCESS = 'COMMENT_SUCCESS',
  COMMENT_FAIL = 'COMMENT_FAIL',
}

export const getPostInfo: ActionCreator<PostAction> = (postID: number) => ({
  type: PostsActions.GET_POST_DETAILS,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_POST_DETAILS}${postID}/`,
    },
    postID,
  },
});

export const sendLikeOrDislike: ActionCreator<PostAction> = (postID: number) => ({
  type: PostsActions.LIKE_OR_DISLIKE,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.LIKE_DISLIKE,
      data: {
        post_id: postID,
      },
    },
    postID,
  },
});

export const sendComment: ActionCreator<PostAction> = (postID: number, commentText: string) => ({
  type: PostsActions.COMMENT,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.COMMENT,
      data: {
        post_id: postID,
        content: commentText,
      },
    },
    postID,
  },
});

// TODO: This must be removed someday!
export const injectNewPosts = (newPosts: PostDetails[]) => ({
  type: PostsActions.INJECT_NEW_POSTS,
  payload: newPosts,
});
