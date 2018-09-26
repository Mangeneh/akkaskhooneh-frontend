import produce from 'immer';
import { PagintorActions } from './paginator';
import { extractPreviousAction } from '../helpers';
import { UsersActions } from '../actions';

const pagination = produce((draft, action) => {
  switch (action.type) {
    case PagintorActions.REFRESH: {
      const { field, initialState } = action.payload;
      draft[field] = {
        ...initialState,
        ...draft[field],
        isRefreshing: true,
      };
      return;
    }
    case PagintorActions.REFRESH_SUCCESS: {
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
    case PagintorActions.LOAD_MORE: {
      const { field } = action.payload;
      draft[field] = {
        ...draft[field],
        isLoading: true,
      };
      return;
    }
    case PagintorActions.LOAD_MORE_SUCCESS: {
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
