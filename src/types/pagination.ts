import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RequestMethods } from '../config';
import { PaginatorActions } from '../reducers/paginator';
import { State } from './state';

export interface PaginatorRequestAction extends AnyAction {
  type: PaginatorActions.REFRESH | PaginatorActions.LOAD_MORE;
  payload: {
    request: {
      method: RequestMethods.GET,
      url: string,
    },
    field: string,
    initialState: any,
  };
}

export type PaginatorRequestThunk = ThunkAction<Pagination, State, never, PaginatorRequestAction>;

export interface PaginatorSuccessAction extends AnyAction {
  payload: PaginatorSuccessPayload;
  meta: {
    previousAction: PaginatorRequestAction,
  };
}

export interface PaginatorSuccessPayload {
  data: {
    count: number,
    results: any[],
    total_pages: number,
  };
}

export interface PaginatorFailAction extends AnyAction {
  meta: {
    previousAction: PaginatorRequestAction,
  };
}

export interface Pagination {
  data: any[];
  nextPage: number;
  totalPages: number;
  isFirstFetch: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
}
