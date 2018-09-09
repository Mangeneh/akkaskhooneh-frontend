import { RequestMethods, Server } from '../../config';

export const SearchedPostsActions = {
  GET_SEARCH_PHOTOS_NEXT_PAGE: 'GET_SEARCH_PHOTOS_NEXT_PAGE',
  GET_SEARCH_PHOTOS_NEXT_PAGE_SUCCESS: 'GET_SEARCH_PHOTOS_NEXT_PAGE_SUCCESS',
  GET_SEARCH_PHOTOS_NEXT_PAGE_FAIL: 'GET_SEARCH_PHOTOS_NEXT_PAGE_FAIL',
  REFRESH_SEARCH_PHOTOS: 'REFRESH_SEARCH_PHOTOS',
};

export const refreshSearchPhotos = () => ({
  type: SearchedPostsActions.REFRESH_SEARCH_PHOTOS,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SEARCH_PHOTOS}1`,
    },
  },
});

// export const choosePost = postID => ({
//   type: PostsActions.CHOOSE_POST,
//   payload: postID,
// });

export const getSearchPhotosNextPage = photosNext => ({
  type: SearchedPostsActions.GET_SEARCH_PHOTOS_NEXT_PAGE,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_SEARCH_PHOTOS}${photosNext}`,
    },
  },
});
