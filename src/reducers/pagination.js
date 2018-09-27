import produce from 'immer';
import { PaginatorActions } from './paginator';
import { extractPreviousAction } from '../helpers';
import { UsersActions } from '../actions';

const pagination = produce((draft, action) => {
  switch (action.type) {
    case PaginatorActions.REFRESH: {
      const { field, initialState } = action.payload;
      draft[field] = {
        ...initialState,
        ...draft[field],
        isRefreshing: true,
      };
      return;
    }
    case PaginatorActions.REFRESH_SUCCESS: {
      const previousAction = extractPreviousAction(action);
      const { field } = previousAction.payload;
      draft[field] = {
        ...draft[field],
        data: action.payload.data.results,
        nextPage: 2,
        totalPages: action.payload.data.total_pages,
        isFirstFetch: false,
        isRefreshing: false,
      };
      return;
    }
    case PaginatorActions.LOAD_MORE: {
      const { field } = action.payload;
      draft[field] = {
        ...draft[field],
        isLoading: true,
      };
      return;
    }
    case PaginatorActions.LOAD_MORE_SUCCESS: {
      const previousAction = extractPreviousAction(action);
      const { field } = previousAction.payload;
      draft[field] = {
        ...draft[field],
        data: draft[field].data.concat(action.payload.data.results),
        nextPage: draft[field].nextPage + 1,
        totalPages: action.payload.data.total_pages,
        isLoading: false,
      };
      return;
    }
    case UsersActions.SIGN_OUT:
      draft = {};
  }
}, {});

export default pagination;
