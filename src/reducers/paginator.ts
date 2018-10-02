import { IPaginatorRequestAction, IPaginatorSuccessAction } from '../types/pagination';
import { IState } from '../types/state';
import { RequestMethods } from '../utils/RequestMethods';

export enum PaginatorActions {
  REFRESH = 'REFRESH',
  REFRESH_SUCCESS = 'REFRESH_SUCCESS',
  REFRESH_FAIL = 'REFRESH_FAIL',
  LOAD_MORE = 'LOAD_MORE',
  LOAD_MORE_SUCCESS = 'LOAD_MORE_SUCCESS',
  LOAD_MORE_FAIL = 'LOAD_MORE_FAIL',
}

const initialState = {
  data: [],
  nextPage: 1,
  totalPages: 1,
  isFirstFetch: true,
  isRefreshing: false,
  isLoading: false,
};

export type IOnSuccess = ((dispatch: IDispatch, data: any[]) => any) | undefined;
type IDispatch = (action: IPaginatorRequestAction) => Promise<IPaginatorSuccessAction>;

export const generatePaginatorActionCreators =
  (name: string, id: string, onRefreshSuccess: IOnSuccess, onLoadMoreSuccess: IOnSuccess) => {
    const field = createField(name, id);
    const refresh = (url: string) => (dispatch: IDispatch) => {
      return dispatch({
        type: PaginatorActions.REFRESH,
        payload: {
          request: {
            method: RequestMethods.GET,
            url,
          },
          field,
          initialState,
        },
      }).then((response) => {
        if (onRefreshSuccess !== undefined) {
          const data = response.payload.data.results;
          onRefreshSuccess(dispatch, data);
        }
      });
    };
    const loadMore = (url: string) => (dispatch: IDispatch) => {
      return dispatch({
        type: PaginatorActions.LOAD_MORE,
        payload: {
          request: {
            method: RequestMethods.GET,
            url,
          },
          field,
          initialState,
        },
      }).then((response) => {
        if (onLoadMoreSuccess !== undefined) {
          const data = response.payload.data.results;
          onLoadMoreSuccess(dispatch, data);
        }
      });
    };
    return {
      refresh,
      loadMore,
    };
  };

export const generatePaginatorSelectors = (state: IState, name: string, id: string) => {
  const field = createField(name, id);
  const selectData = (): any[] => selectField(state, field).data;
  const selectNextPage = (): number => selectField(state, field).nextPage;
  const selectTotalPages = (): number => selectField(state, field).totalPages;
  const selectIsFirstFetch = (): boolean => selectField(state, field).isFirstFetch;
  const selectIsRefreshing = (): boolean => selectField(state, field).isRefreshing;
  const selectIsLoading = (): boolean => selectField(state, field).isLoading;
  return {
    selectData,
    selectNextPage,
    selectTotalPages,
    selectIsFirstFetch,
    selectIsRefreshing,
    selectIsLoading,
  };
};

const createField = (name: string, id: string) => `${name}${id}`;
const selectPagination = (state: IState) => state.pagination;
const selectField = (state: IState, field: string) => {
  const stateField = selectPagination(state)[field];
  if (stateField === undefined) {
    return initialState;
  }
  return stateField;
};
