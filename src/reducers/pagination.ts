import produce from 'immer';
import { AnyAction } from 'redux';
import { Pagination, PaginatorFailAction, PaginatorSuccessAction } from '../types';
import { PaginatorActions } from './paginator';

export interface PaginationState {
  [field: string]: Pagination;
}

const pagination = produce<PaginationState>((draft: PaginationState, action: AnyAction) => {
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
      const currentAction = action as PaginatorSuccessAction;
      const field = currentAction.meta.previousAction.payload.field;
      draft[field] = {
        ...draft[field],
        data: currentAction.payload.data.results,
        nextPage: 2,
        totalPages: currentAction.payload.data.total_pages,
        isFirstFetch: false,
        isRefreshing: false,
      };
      return;
    }
    case PaginatorActions.REFRESH_FAIL: {
      const currentAction = action as PaginatorFailAction;
      const field = currentAction.meta.previousAction.payload.field;
      draft[field] = {
        ...draft[field],
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
      const currentAction = action as PaginatorSuccessAction;
      const field = currentAction.meta.previousAction.payload.field;
      draft[field] = {
        ...draft[field],
        data: draft[field].data.concat(currentAction.payload.data.results),
        nextPage: draft[field].nextPage + 1,
        totalPages: currentAction.payload.data.total_pages,
        isLoading: false,
      };
      return;
    }
    case PaginatorActions.LOAD_MORE_FAIL: {
      const currentAction = action as PaginatorFailAction;
      const field = currentAction.meta.previousAction.payload.field;
      draft[field] = {
        ...draft[field],
        isLoading: false,
      };
      return;
    }
  }
}, {});

export default pagination;
