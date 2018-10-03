import { Server } from './Server';

export const createHomePostsURL = (nextPage = 1) => `${Server.GET_HOME_POSTS}?page=${nextPage}`;

export const createTagPhotosURL = (tagID: number, nextPage = 1) =>
  `${Server.GET_TAG_PHOTOS}${tagID}/?page=${nextPage}`;

export const createBoardPhotosURL = (boardID: number, nextPage = 1) =>
  `${Server.GET_BOARD_DETAILS}${boardID}/?page=${nextPage}`;

export const createUserPhotosURL = (username: string, nextPage = 1) =>
  `${Server.GET_USER_PHOTOS}${username}/?page=${nextPage}`;

export const createUserBoardsURL = (username: string, nextPage = 1) =>
  `${Server.GET_BOARDS}${username}/?page=${nextPage}`;

export const createPostCommentsURL = (postID: number, nextPage = 1) =>
  `${Server.GET_COMMENT_LIST}${postID}/?page=${nextPage}`;

export const createFollowersURL = (username: number, searchText: string, nextPage = 1) =>
  `${Server.GET_SEARCH_FOLLOWERS_RESULTS}${username}/?search=${searchText}&page=${nextPage}`;

export const createFollowingsURL = (username: string, searchText: string, nextPage = 1) =>
  `${Server.GET_SEARCH_FOLLOWINGS_RESULTS}${username}/?search=${searchText}&page=${nextPage}`;

export const createTopTagsURL = (nextPage = 1) => `${Server.GET_TOP_TAGS}?page=${nextPage}`;

export const createNotificationsURL = (nextPage = 1) =>
  `${Server.GET_NOTIFICATIONS}?page=${nextPage}`;

export const createSearchUsersURL = (searchText: string, nextPage = 1) =>
  `${Server.GET_SEARCH_USERS_RESULTS}?search=${searchText}&page=${nextPage}`;

export const createSearchTagsURL = (searchText: string, nextPage = 1) =>
  `${Server.GET_SEARCH_TAGS_RESULTS}?search=${searchText}&page=${nextPage}`;
