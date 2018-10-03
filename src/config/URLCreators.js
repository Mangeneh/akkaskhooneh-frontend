import { Server } from './Server';

export const createHomePostsURL = (nextPage = 1) => `${Server.GET_HOME_POSTS}?page=${nextPage}`;
export const createTagPhotosURL = (tagID, nextPage = 1) => `${Server.GET_TAGS_PHOTOS_NEXT_PAGE}${tagID}/?page=${nextPage}`;
export const createBoardPhotosURL = (boardID, nextPage = 1) => `${Server.GET_BOARDS_DETAILS}${boardID}/?page=${nextPage}`;
export const createUserPhotosURL = (username, nextPage = 1) => `${Server.GET_USER_PHOTOS}${username}/?page=${nextPage}`;
export const createUserBoardsURL = (username, nextPage = 1) => `${Server.GET_BOARDS_NEXT_PAGE}${username}/?page=${nextPage}`;
export const createPostCommentsURL = (postID, nextPage = 1) => `${Server.GET_COMMENTS_LIST}${postID}/?page=${nextPage}`;
export const createFollowersURL = (username, searchText, nextPage = 1) => `${Server.GET_SEARCH_FOLLOWERS_RESULTS}${username}/?search=${searchText}&page=${nextPage}`;
export const createFollowingsURL = (username, searchText, nextPage = 1) => `${Server.GET_SEARCH_FOLLOWINGS_RESULTS}${username}/?search=${searchText}&page=${nextPage}`;
export const createTopTagsURL = (nextPage = 1) => `${Server.GET_TOP_TAGS}?page=${nextPage}`;
export const createNotificationsURL = (nextPage = 1) => `${Server.GET_NOTIFICATIONS}?page=${nextPage}`;
export const createSearchUsersURL = (searchText, nextPage = 1) => `${Server.GET_SEARCH_USERS_RESULTS}?search=${searchText}&page=${nextPage}`;
export const createSearchTagsURL = (searchText, nextPage = 1) => `${Server.GET_SEARCH_TAGS_RESULTS}?search=${searchText}&page=${nextPage}`;
