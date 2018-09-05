import {Server, RequestMethods} from "../config";

export const PostsActions = {
    GET_SELF_PHOTOS_NEXT_PAGE: 'GET_SELF_PHOTOS_NEXT_PAGE',
    GET_SELF_PHOTOS_NEXT_PAGE_SUCCESS: 'GET_SELF_PHOTOS_NEXT_PAGE_SUCCESS',
    GET_SELF_PHOTOS_NEXT_PAGE_FAIL: 'GET_SELF_PHOTOS_NEXT_PAGE_FAIL',
    RESET_SELF_PHOTOS: 'RESET_SELF_PHOTOS',   
    GET_HOME_POSTS_NEXT_PAGE: 'GET_HOME_POSTS_NEXT_PAGE',
    GET_HOME_POSTS_NEXT_PAGE_SUCCESS: 'GET_HOME_POSTS_NEXT_PAGE_SUCCESS',
    GET_HOME_POSTS_NEXT_PAGE_FAIL: 'GET_HOME_POSTS_NEXT_PAGE_FAIL',
    RESET_HOME_POSTS: 'RESET_HOME_POSTS',
    GET_OTHERS_PHOTOS_NEXT_PAGE: 'GET_OTHERS_PHOTOS_NEXT_PAGE',
    GET_OTHERS_PHOTOS_NEXT_PAGE_SUCCESS: 'GET_OTHERS_PHOTOS_NEXT_PAGE_SUCCESS',
    GET_OTHERS_PHOTOS_NEXT_PAGE_FAIL: 'GET_OTHERS_PHOTOS_NEXT_PAGE_FAIL',
    RESET_OTHERS_PHOTOS: 'RESET_OTHERS_PHOTOS',
};

export const resetSelfPhotos = () => {
    return {
        type: PostsActions.RESET_SELF_PHOTOS
    }
};

export const resetHomePosts = () => {
    return {
        type: PostsActions.RESET_HOME_POSTS
    }
};

export const getSelfPhotosNextPage = (photosNext) => {
    return {
        type: PostsActions.GET_SELF_PHOTOS_NEXT_PAGE,
        payload: {
            request: {
                method: RequestMethods.GET,
                url: `${Server.GET_SELF_PHOTOS_NEXT_PAGE}${photosNext}`,
            }
        }
    };
};

export const getHomePostsNextPage = (postsNext) => {
    return {
        type: PostsActions.GET_HOME_POSTS_NEXT_PAGE,
        payload: {
            request: {
                method: RequestMethods.GET,
                url: `${Server.GET_HOME_POSTS_NEXT_PAGE}${postsNext}`,
            }
        }
    };
};