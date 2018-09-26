import { Server } from './Server';

export const createHomeURL = (nextPage = 1) => `${Server.GET_HOME_POSTS_NEXT_PAGE}${nextPage}`;

export const createTagPhotosURL = (tagID, nextPage = 1) => `${Server.GET_TAGS_PHOTOS_NEXT_PAGE}${tagID}/?page=${nextPage}`;
