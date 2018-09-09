import { SearchedPostsActions } from './actions';

const INITIAL_SEARCH_PHOTOS_STATE = {
  searchPhotos: [],
  searchPhotosNextPage: 1,
  searchPhotosTotalPages: 1,
  searchPhotosIsLoading: false,
};

const INITIAL_STATE = {
  ...INITIAL_SEARCH_PHOTOS_STATE,
//   chosenPostID: 0,
};


export default (state = INITIAL_STATE, action) => {
  const {
    GET_SEARCH_PHOTOS_NEXT_PAGE,
    GET_SEARCH_PHOTOS_NEXT_PAGE_SUCCESS,
    GET_SEARCH_PHOTOS_NEXT_PAGE_FAIL,
    REFRESH_SEARCH_PHOTOS,
    REFRESH_SEARCH_PHOTOS_SUCCESS,
  } = SearchedPostsActions;
  switch (action.type) {
    case REFRESH_SEARCH_PHOTOS:
      return {
        ...state,
        searchPhotosIsLoading: true,
      };
    case REFRESH_SEARCH_PHOTOS_SUCCESS:
      return {
        ...state,
        searchPhotos: action.payload.data.results,
        searchPhotosNextPage: 2,
        searchPhotosTotalPages: action.payload.data.total_pages,
        searchPhotosIsLoading: false,
      };
    case GET_SEARCH_PHOTOS_NEXT_PAGE:
      return {
        ...state,
        searchPhotosIsLoading: true,
      };
    case GET_SEARCH_PHOTOS_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        searchPhotos: state.comments.concat(action.payload.data.results),
        searchPhotosNextPage: state.commentsNextPage + 1,
        searchPhotosTotalPages: action.payload.data.total_pages,
        searchPhotosIsLoading: false,
      };
    default:
      return state;
  }
};

export const selectSearchPhotos = state => state.posts.searchPhotos;
export const selectSearchPhotosNextPage = state => state.posts.searchPhotosNextPage;
export const selectSearchPhotosTotalPages = state => state.posts.searchPhotosTotalPages;
export const selectSearchPhotosIsLoading = state => state.posts.searchPhotosIsLoading;
