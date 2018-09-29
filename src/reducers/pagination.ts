import produce from 'immer';
import { AnyAction } from 'redux';
import { IPagination, IPaginatorFailAction, IPaginatorSuccessAction } from '../types/pagination';
import { PaginatorActions } from './paginator';

export interface IPaginationState {
  [field: string]: IPagination;
}

const pagination = produce<IPaginationState>((draft: IPaginationState, action: AnyAction) => {
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
      const currentAction = action as IPaginatorSuccessAction;
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
      const currentAction = action as IPaginatorFailAction;
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
      const currentAction = action as IPaginatorSuccessAction;
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
      const currentAction = action as IPaginatorFailAction;
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
