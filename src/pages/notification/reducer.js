import GlobalActions from '../../actions';
import { NotificationActions } from './actions';

const INITIAL_NOTIFICATIONS = {
  notifications: [],
  notificationsNextPage: 1,
  notificationsTotalPages: 1,
  notificationsIsLoading: false,
};

const INITIAL_STATE = {
  ...INITIAL_NOTIFICATIONS_STATE,
};

export default (state = INITIAL_STATE, action) => {
  const {
  } = NotificationActions;
  switch (action.type) {
    case START_NEW_SEARCH:
      return {
        ...state,
        searchTagsNextPage: 1,
        searchUsersNextPage: 1,
      };
    case GET_SEARCH_USERS_NEXT_PAGE:
      return {
        ...state,
        searchUsersIsLoading: true,
      };
    case GET_SEARCH_USERS_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        searchUsers: state.searchUsers.concat(action.payload.data.results),
        searchUsersNextPage: state.searchUsersNextPage + 1,
        searchUsersTotalPages: action.payload.data.total_pages,
        searchUsersIsLoading: false,
      };
    case GET_SEARCH_USERS_NEXT_PAGE_FAIL:
      return {
        ...state,
        searchUsersIsLoading: false,
      };
    case REFRESH_SEARCH_USERS:
      return {
        ...state,
        searchUsersIsLoading: true,
      };
    case REFRESH_SEARCH_USERS_SUCCESS:
      return {
        ...state,
        searchUsers: action.payload.data.results,
        searchUsersNextPage: state.searchUsersNextPage + 1,
        searchUsersTotalPages: action.payload.data.total_pages,
        searchUsersIsLoading: false,
      };
    case REFRESH_SEARCH_USERS_FAIL:
      return {
        ...state,
        searchUsersIsLoading: false,
      };
    case RESET_SEARCH_USERS:
      return { ...state, ...INITIAL_SEARCH_USERS_STATE };
    case GET_SEARCH_TAGS_NEXT_PAGE:
      return {
        ...state,
        searchTagsIsLoading: true,
      };
    case GET_SEARCH_TAGS_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        searchTags: state.searchTags.concat(action.payload.data.results),
        searchTagsNextPage: state.searchTagsNextPage + 1,
        searchTagsTotalPages: action.payload.data.total_pages,
        searchTagsIsLoading: false,
      };
    case GET_SEARCH_TAGS_NEXT_PAGE_FAIL:
      return {
        ...state,
        searchTagsIsLoading: false,
      };
    case REFRESH_SEARCH_TAGS:
      return {
        ...state,
        searchTagsIsLoading: true,
      };
    case REFRESH_SEARCH_TAGS_SUCCESS:
      return {
        ...state,
        searchTags: action.payload.data.results,
        searchTagsNextPage: 2,
        searchTagsTotalPages: action.payload.data.total_pages,
        searchTagsIsLoading: false,
      };
    case REFRESH_SEARCH_TAGS_FAIL:
      return {
        ...state,
        searchTagsIsLoading: false,
      };
    case RESET_SEARCH_TAGS:
      return { ...state, ...INITIAL_SEARCH_TAGS_STATE };
    case GlobalActions.RESET_EVERYTHING:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const selectNotifications = state => state.;
export const selectNotificationsNextPage = state => state.;
export const selectNotificationsTotalPages = state => state.;
export const selectNotificationsIsLoading = state => state.;

