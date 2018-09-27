import { RequestMethods } from '../config';

export const PaginatorActions = {
  REFRESH: 'REFRESH',
  REFRESH_SUCCESS: 'REFRESH_SUCCESS',
  REFRESH_FAIL: 'REFRESH_FAIL',
  LOAD_MORE: 'LOAD_MORE',
  LOAD_MORE_SUCCESS: 'LOAD_MORE_SUCCESS',
  LOAD_MORE_FAIL: 'LOAD_MORE_FAIL',
};

const initialState = {
  data: [],
  nextPage: true,
  totalPages: true,
  isFirstFetch: true,
  isRefreshing: false,
  isLoading: false,
};

export const generatePaginatorActionCreators = (name, id, onRefreshSuccess, onLoadMoreSuccess) => {
  const field = createField(name, id);
  const refresh = url => (dispatch) => {
    dispatch({
      type: PaginatorActions.REFRESH,
      payload: {
        request: {
          method: RequestMethods.GET,
          url,
        },
        field,
        initialState,
      },
    })
      .then((response) => {
        if (onRefreshSuccess !== undefined) {
          const data = response.payload.data.results;
          onRefreshSuccess(dispatch, data);
        }
      });
  };
  const loadMore = url => (dispatch) => {
    dispatch({
      type: PaginatorActions.LOAD_MORE,
      payload: {
        request: {
          method: RequestMethods.GET,
          url,
        },
        field,
      },
    })
      .then((response) => {
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

export const generatePaginatorSelectors = (state, name, id) => {
  const field = createField(name, id);
  const selectData = () => selectField(state, field).data;
  const selectNextPage = () => selectField(state, field).nextPage;
  const selectTotalPages = () => selectField(state, field).totalPages;
  const selectIsFirstFetch = () => selectField(state, field).isFirstFetch;
  const selectIsRefreshing = () => selectField(state, field).isRefreshing;
  const selectIsLoading = () => selectField(state, field).isLoading;
  return {
    selectData,
    selectNextPage,
    selectTotalPages,
    selectIsFirstFetch,
    selectIsRefreshing,
    selectIsLoading,
  };
};

const createField = (name, id) => `${name}${id}`;
const selectPagination = state => state.pagination;
const selectField = (state, field) => {
  const stateField = selectPagination(state)[field];
  if (stateField === undefined) {
    return initialState;
  }
  return stateField;
};
