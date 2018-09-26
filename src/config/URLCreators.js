import { PagintorActions } from '../reducers/paginator';
import { Server } from './Server';

export const createHomeURL = (actionType, nextPage) => {
  if (actionType === PagintorActions.REFRESH) {
    return `${Server.GET_HOME_POSTS_NEXT_PAGE}1`;
  }
  return `${Server.GET_HOME_POSTS_NEXT_PAGE}${nextPage}`;
};
