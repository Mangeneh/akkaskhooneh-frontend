import {PostsActions} from '../actions/PostsActions';

const INITIAL_SELF_PHOTOS_STATE = {
    selfPhotos: [],
    selfPhotosNextPage: 1,
    selfPhotosTotalPages: 1,
    selfPhotosIsLoading: true
};

const INITIAL_HOME_POSTS_STATE = {
    homePosts: [],
    homePostsNextPage: 1,
    homePostsTotalPages: 1,
    homePostsIsLoading: true
};

const INITIAL_OTHERS_PHOTOS_STATE = {
    othersPhotos: [],
    othersPhotosNextPage: 1,
    othersPhotosTotalPages: 1,
    othersPhotosIsLoading: true
};

const INITIAL_STATE = {
    ...INITIAL_SELF_PHOTOS_STATE,
    ...INITIAL_HOME_POSTS_STATE,
    ...INITIAL_OTHERS_PHOTOS_STATE
};

export default (state = INITIAL_STATE, action) => {
    const {GET_SELF_PHOTOS_NEXT_PAGE, GET_SELF_PHOTOS_NEXT_PAGE_FAIL, GET_SELF_PHOTOS_NEXT_PAGE_SUCCESS, RESET_HOME_POSTS, RESET_OTHERS_PHOTOS, RESET_SELF_PHOTOS} = PostsActions;
    switch (action.type) {
        case GET_SELF_PHOTOS_NEXT_PAGE:
            return {...state, selfPhotosIsLoading: true};
        case GET_SELF_PHOTOS_NEXT_PAGE_SUCCESS:
            return {
                ...state,
                selfPhotos: state.selfPhotos.concat(action.payload.data.results),
                selfPhotosNextPage: state.selfPhotosNextPage + 1,
                selfPhotosTotalPages: action.payload.data.total_pages,
                selfPhotosIsLoading: false,
            };
        case RESET_SELF_PHOTOS:
            return {...state, ...INITIAL_SELF_PHOTOS_STATE};
        case RESET_HOME_POSTS:
            return {...state, ...INITIAL_HOME_POSTS_STATE};
        case RESET_OTHERS_PHOTOS:
            return {...state, ...INITIAL_OTHERS_PHOTOS_STATE};
        default:
            return state;
    }
}

export const selectSelfPhotos = (state) => state.posts.selfPhotos;
export const selectSelfPhotosNextPage = (state) => state.posts.selfPhotosNextPage;
export const selectSelfPhotosTotalPages = (state) => state.posts.selfPhotosTotalPages;
export const selectSelfPhotosIsLoading = (state) => state.posts.selfPhotosIsLoading;

export const selectHomePosts = (state) => state.posts.homePosts;
export const selectHomePostsNextPage = (state) => state.posts.homePostsNextPage;
export const selectHomePostsTotalPages = (state) => state.posts.homePostsTotalPages;
export const selectHomePostsIsLoading = (state) => state.posts.homePostsIsLoading;

export const selectOthersPhotos = (state) => state.posts.othersPhotos;
export const selectOthersPhotosNextPage = (state) => state.posts.othersPhotosNextPage;
export const selectOthersPhotosTotalPages = (state) => state.posts.othersPhotosTotalPages;
export const selectOthersPhotosIsLoading = (state) => state.posts.othersPhotosIsLoading;