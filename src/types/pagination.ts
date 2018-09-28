import { AnyAction } from 'redux';
import { PaginatorActions } from '../reducers/paginator';
import { RequestMethods } from '../utils/RequestMethods';

export interface IPaginatorRequestAction extends AnyAction {
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

export interface IPaginatorSuccessAction extends AnyAction {
  payload: IPaginatorSuccessPayload;
  meta: {
    previousAction: IPaginatorRequestAction,
  };
}

export interface IPaginatorSuccessPayload {
  data: {
    count: number,
    results: any[],
    total_pages: number,
  };
}

export interface IPagination {
  data: any[];
  nextPage: number;
  totalPages: number;
  isFirstFetch: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
}
