import { RequestMethods, Server } from '../config';

export const PostsActions = {
  GET_SELF_PHOTOS_NEXT_PAGE: 'GET_SELF_PHOTOS_NEXT_PAGE',
  GET_SELF_PHOTOS_NEXT_PAGE_SUCCESS: 'GET_SELF_PHOTOS_NEXT_PAGE_SUCCESS',
  GET_SELF_PHOTOS_NEXT_PAGE_FAIL: 'GET_SELF_PHOTOS_NEXT_PAGE_FAIL',
  RESET_SELF_PHOTOS: 'RESET_SELF_PHOTOS',
  //
  GET_HOME_POSTS_NEXT_PAGE: 'GET_HOME_POSTS_NEXT_PAGE',
  GET_HOME_POSTS_NEXT_PAGE_SUCCESS: 'GET_HOME_POSTS_NEXT_PAGE_SUCCESS',
  GET_HOME_POSTS_NEXT_PAGE_FAIL: 'GET_HOME_POSTS_NEXT_PAGE_FAIL',
  RESET_HOME_POSTS: 'RESET_HOME_POSTS',
  //
  GET_OTHERS_PHOTOS_NEXT_PAGE: 'GET_OTHERS_PHOTOS_NEXT_PAGE',
  GET_OTHERS_PHOTOS_NEXT_PAGE_SUCCESS: 'GET_OTHERS_PHOTOS_NEXT_PAGE_SUCCESS',
  GET_OTHERS_PHOTOS_NEXT_PAGE_FAIL: 'GET_OTHERS_PHOTOS_NEXT_PAGE_FAIL',
  RESET_OTHERS_PHOTOS: 'RESET_OTHERS_PHOTOS',
  //
  CHOOSE_POST: 'CHOOSE_POST',
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
  REFRESH_SELF_PHOTOS: 'REFRESH_SELF_PHOTOS',
  REFRESH_SELF_PHOTOS_SUCCESS: 'REFRESH_SELF_PHOTOS_SUCCESS',
  REFRESH_SELF_PHOTOS_FAIL: 'REFRESH_SELF_PHOTOS_FAIL',
  //
  REFRESH_HOME_POSTS: 'REFRESH_HOME_POSTS',
  REFRESH_HOME_POSTS_SUCCESS: 'REFRESH_HOME_POSTS_SUCCESS',
  REFRESH_HOME_POSTS_FAIL: 'REFRESH_HOME_POSTS_FAIL',
  //
  REFRESH_OPEN_POST_COMMENTS: 'REFRESH_OPEN_POST_COMMENTS',
  REFRESH_OPEN_POST_COMMENTS_SUCCESS: 'REFRESH_OPEN_POST_COMMENTS_SUCCESS',
  REFRESH_OPEN_POST_COMMENTS_FAIL: 'REFRESH_OPEN_POST_COMMENTS_FAIL',
  //
  GET_OPEN_POST_COMMENTS_NEXT_PAGE: 'GET_OPEN_POST_COMMENTS_NEXT_PAGE',
  GET_OPEN_POST_COMMENTS_NEXT_PAGE_SUCCESS: 'GET_OPEN_POST_COMMENTS_NEXT_PAGE_SUCCESS',
  GET_OPEN_POST_COMMENTS_NEXT_PAGE_FAIL: 'GET_OPEN_POST_COMMENTS_NEXT_PAGE_FAIL',
};

export const resetSelfPhotos = () => ({
  type: PostsActions.RESET_SELF_PHOTOS,
});

export const resetHomePosts = () => ({
  type: PostsActions.RESET_HOME_POSTS,
});

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

export const refreshSelfPhotos = () => ({
  type: PostsActions.REFRESH_SELF_PHOTOS,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SELF_PHOTOS_NEXT_PAGE}1`,
    },
  },
});

export const refreshHomePosts = () => ({
  type: PostsActions.REFRESH_HOME_POSTS,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_HOME_POSTS_NEXT_PAGE}1`,
    },
  },
});

export const choosePost = postID => ({
  type: PostsActions.CHOOSE_POST,
  payload: postID,
});

export const getSelfPhotosNextPage = photosNext => ({
  type: PostsActions.GET_SELF_PHOTOS_NEXT_PAGE,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SELF_PHOTOS_NEXT_PAGE}${photosNext}`,
    },
  },
});

export const getHomePostsNextPage = postsNext => ({
  type: PostsActions.GET_HOME_POSTS_NEXT_PAGE,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_HOME_POSTS_NEXT_PAGE}${postsNext}`,
    },
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

export const getPostInfo = selectedPostID => ({
  type: PostsActions.GET_POST_INFO,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_POST_INFO}${selectedPostID}/`,
    },
    postID: selectedPostID,
  },
});

export const sendLikeOrDislike = selectedPostID => ({
  type: PostsActions.LIKE_OR_DISLIKE,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.LIKE_DISLIKE,
      data: {
        post_id: selectedPostID,
      },
      postID: selectedPostID,
    },
  },
});

export const sendComment = (selectedPostID, commentText) => ({
  type: PostsActions.COMMENT,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.COMMENT,
      data:
        {
          post_id: selectedPostID,
          content: commentText,
        },
      postID: selectedPostID,
    },
  },
});
