import { UsersActions } from '../../actions';
import { NotificationActions } from './actions';

const INITIAL_NOTIFICATIONS_STATE = {
  notifications: [],
  notificationsNextPage: 1,
  notificationsTotalPages: 1,
  notificationsIsFirstFetch: true,
  notificationsIsRefreshing: false,
  notificationsIsLoading: false,
};

const INITIAL_STATE = {
  ...INITIAL_NOTIFICATIONS_STATE,
};

export default (state = INITIAL_STATE, action) => {
  const {
    GET_NOTIFICATION_NEXT_PAGE,
    GET_NOTIFICATION_NEXT_PAGE_SUCCESS,
    GET_NOTIFICATION_NEXT_PAGE_FAIL,
    RESET_NOTIFICATION,
    REFRESH_NOTIFICATION,
    REFRESH_NOTIFICATION_SUCCESS,
    REFRESH_NOTIFICATION_FAIL,
  } = NotificationActions;
  switch (action.type) {
    case GET_NOTIFICATION_NEXT_PAGE:
      return {
        ...state,
        notificationsIsLoading: true,
      };
    case GET_NOTIFICATION_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.concat(action.payload.data.results),
        notificationsNextPage: state.notificationsNextPage + 1,
        notificationsTotalPages: action.payload.data.total_pages,
        notificationsIsLoading: false,
      };
    case GET_NOTIFICATION_NEXT_PAGE_FAIL:
      return {
        ...state,
        notificationsIsLoading: false,
      };
    case REFRESH_NOTIFICATION:
      return {
        ...state,
        notificationsIsRefreshing: true,
      };
    case REFRESH_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: action.payload.data.results,
        notificationsNextPage: 2,
        notificationsTotalPages: action.payload.data.total_pages,
        notificationsIsFirstFetch: false,
        notificationsIsRefreshing: false,
      };
    case REFRESH_NOTIFICATION_FAIL:
      return {
        ...state,
        notificationsIsRefreshing: false,
      };
    case UsersActions.SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const selectNotificationPage = state => state.notification;

export const selectNotifications = state => selectNotificationPage(state).notifications;
export const selectNotificationsNextPage = state => selectNotificationPage(state).notificationsNextPage;
export const selectNotificationsTotalPages = state => selectNotificationPage(state).notificationsTotalPages;
export const selectNotificationsIsFirstFetch = state => selectNotificationPage(state).notificationsIsFirstFetch;
export const selectNotificationsIsRefreshing = state => selectNotificationPage(state).notificationsIsRefreshing;
export const selectNotificationsIsLoading = state => selectNotificationPage(state).notificationsIsLoading;
