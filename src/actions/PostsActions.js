import { RequestMethods, Server } from '../config';

export const PostsActions = {
  INJECT_NEW_POSTS: 'INJECT_NEW_POSTS',
  //
  GET_POST_INFO: 'FEED_GET_POST_INFO',
  GET_POST_INFO_SUCCESS: 'FEED_GET_POST_INFO_SUCCESS',
  GET_POST_INFO_FAIL: 'FEED_GET_POST_INFO_Fail',
  //
  LIKE_OR_DISLIKE: 'LIKE_OR_DISLIKE',
  LIKE_OR_DISLIKE_SUCCESS: 'LIKE_OR_DISLIKE_SUCCESS',
  LIKE_OR_DISLIKE_FAIL: 'LIKE_OR_DISLIKE_FAIL',
  //
  COMMENT: 'COMMENT',
  COMMENT_SUCCESS: 'COMMENT_SUCCESS',
  COMMENT_FAIL: 'COMMENT_FAIL',
  //
  REFRESH_OPEN_POST_COMMENTS: 'REFRESH_OPEN_POST_COMMENTS',
  REFRESH_OPEN_POST_COMMENTS_SUCCESS: 'REFRESH_OPEN_POST_COMMENTS_SUCCESS',
  REFRESH_OPEN_POST_COMMENTS_FAIL: 'REFRESH_OPEN_POST_COMMENTS_FAIL',
  //
  GET_OPEN_POST_COMMENTS_NEXT_PAGE: 'GET_OPEN_POST_COMMENTS_NEXT_PAGE',
  GET_OPEN_POST_COMMENTS_NEXT_PAGE_SUCCESS: 'GET_OPEN_POST_COMMENTS_NEXT_PAGE_SUCCESS',
  GET_OPEN_POST_COMMENTS_NEXT_PAGE_FAIL: 'GET_OPEN_POST_COMMENTS_NEXT_PAGE_FAIL',
};

export const refreshComments = postID => ({
  type: PostsActions.REFRESH_OPEN_POST_COMMENTS,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_COMMENTS_LIST}${postID}/?page=1`,
    },
    postID,
  },
});

export const getCommentsNextPage = (postID, commentsNext) => ({
  type: PostsActions.GET_OPEN_POST_COMMENTS_NEXT_PAGE,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_COMMENTS_LIST}${postID}/?page=${commentsNext}`,
    },
    postID,
  },
});

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
