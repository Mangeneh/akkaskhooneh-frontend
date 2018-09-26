import { Server } from './Server';

export const createHomeURL = (nextPage = 1) => `${Server.GET_HOME_POSTS_NEXT_PAGE}${nextPage}`;
export const createTagPhotosURL = (tagID, nextPage = 1) => `${Server.GET_TAGS_PHOTOS_NEXT_PAGE}${tagID}/?page=${nextPage}`;
export const createBoardPhotosURL = (boardID, nextPage = 1) => `${Server.GET_BOARDS_DETAILS}${boardID}/?page=${nextPage}`;
export const createProfilePhotosURL = (username, nextPage = 1) => `${Server.GET_USER_PHOTOS_NEXT_PAGE}${username}/?page=${nextPage}`;
