import { RequestMethods, Server } from '../config';

export const PostsActions = {
  INJECT_NEW_POSTS: 'INJECT_NEW_POSTS',
  GET_POST_INFO: 'FEED_GET_POST_INFO',
  GET_POST_INFO_SUCCESS: 'FEED_GET_POST_INFO_SUCCESS',
  GET_POST_INFO_FAIL: 'FEED_GET_POST_INFO_Fail',
  LIKE_OR_DISLIKE: 'LIKE_OR_DISLIKE',
  LIKE_OR_DISLIKE_SUCCESS: 'LIKE_OR_DISLIKE_SUCCESS',
  LIKE_OR_DISLIKE_FAIL: 'LIKE_OR_DISLIKE_FAIL',
  COMMENT: 'COMMENT',
  COMMENT_SUCCESS: 'COMMENT_SUCCESS',
  COMMENT_FAIL: 'COMMENT_FAIL',
};

export const getPostInfo = postID => ({
  type: PostsActions.GET_POST_INFO,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_POST_INFO}${postID}/`,
    },
    postID,
  },
});

export const sendLikeOrDislike = postID => ({
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

export const sendComment = (postID, commentText) => ({
  type: PostsActions.COMMENT,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.COMMENT,
      data:
        {
          post_id: postID,
          content: commentText,
        },
    },
    postID,
  },
});

export const injectNewPosts = newPosts => ({
  type: PostsActions.INJECT_NEW_POSTS,
  payload: newPosts,
});
