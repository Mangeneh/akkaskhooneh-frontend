import { Server } from './Server';

export const createHomePostsURL = (nextPage = 1) => `${Server.GET_HOME_POSTS_NEXT_PAGE}${nextPage}`;
export const createTagPhotosURL = (tagID, nextPage = 1) => `${Server.GET_TAGS_PHOTOS_NEXT_PAGE}${tagID}/?page=${nextPage}`;
export const createBoardPhotosURL = (boardID, nextPage = 1) => `${Server.GET_BOARDS_DETAILS}${boardID}/?page=${nextPage}`;
export const createUserPhotosURL = (username, nextPage = 1) => `${Server.GET_USER_PHOTOS_NEXT_PAGE}${username}/?page=${nextPage}`;
export const createUserBoardsURL = (username, nextPage = 1) => `${Server.GET_BOARDS_NEXT_PAGE}${username}/?page=${nextPage}`;
export const createPostCommentsURL = (postID, nextPage = 1) => `${Server.GET_COMMENTS_LIST}${postID}/?page=${nextPage}`;
export const createFollowersURL = (username, searchText, nextPage = 1) => `${Server.GET_SEARCH_FOLLOWERS_RESULTS}${username}/?search=${searchText}&page=${nextPage}`;
export const createFollowingsURL = (username, searchText, nextPage = 1) => `${Server.GET_SEARCH_FOLLOWINGS_RESULTS}${username}/?search=${searchText}&page=${nextPage}`;
