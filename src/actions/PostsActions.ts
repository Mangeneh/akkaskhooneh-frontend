import { Server } from '../config';
import { IPostDetails } from '../types/api';
import { RequestMethods } from '../utils/RequestMethods';

export enum PostsActions {
  INJECT_NEW_POSTS = 'INJECT_NEW_POSTS',
  GET_POST_DETAILS = 'GET_POST_DETAILS',
  GET_POST_DETAILS_SUCCESS = 'GET_POST_DETAILS_SUCCESS',
  GET_POST_DETAILS_FAIL = 'GET_POST_DETAILS_Fail',
  LIKE_OR_DISLIKE = 'LIKE_OR_DISLIKE',
  LIKE_OR_DISLIKE_SUCCESS = 'LIKE_OR_DISLIKE_SUCCESS',
  LIKE_OR_DISLIKE_FAIL = 'LIKE_OR_DISLIKE_FAIL',
  COMMENT = 'COMMENT',
  COMMENT_SUCCESS = 'COMMENT_SUCCESS',
  COMMENT_FAIL = 'COMMENT_FAIL',
}

export const getPostInfo = (postID: number) => ({
  type: PostsActions.GET_POST_DETAILS,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_POST_INFO}${postID}/`,
    },
    postID,
  },
});

export const sendLikeOrDislike = (postID: number) => ({
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

export const sendComment = (postID: number, commentText: string) => ({
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

export const injectNewPosts = (newPosts: IPostDetails[]) => ({
  type: PostsActions.INJECT_NEW_POSTS,
  payload: newPosts,
});
