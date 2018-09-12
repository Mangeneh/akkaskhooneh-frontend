import GlobalActions from '../../actions';
import { NotificationActions } from './actions';

const INITIAL_NOTIFICATIONS_STATE = {
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
    GET_NOTIFICATION_NEXT_PAGE,
    GET_NOTIFICATION_NEXT_PAGE_SUCCESS,
    GET_NOTIFICATION_NEXT_PAGE_FAIL,
    RESET_NOTIFICATION,
    REFRESH_NOTIFICATION,
    REFRESH_NOTIFICATION_SUCCESS,
    REFRESH_NOTIFICATION_FAIL,
    START_NEW_SEARCH,
  } = NotificationActions;
  switch (action.type) {
    case START_NEW_SEARCH:
      return {
        ...state,
        notificationsNextPage: 1,
      };
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
        notificationsIsLoading: true,
      };
    case REFRESH_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: action.payload.data.results,
        notificationsNextPage: state.notificationsNextPage + 1,
        notificationsTotalPages: action.payload.data.total_pages,
        notificationsIsLoading: false,
      };
    case REFRESH_NOTIFICATION_FAIL:
      return {
        ...state,
        notificationsIsLoading: false,
      };
    case RESET_NOTIFICATION:
      return { ...state, ...INITIAL_NOTIFICATIONS_STATE };
    case GlobalActions.RESET_EVERYTHING:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const selectNotifications = state => state.notification.notifications;
export const selectNotificationsNextPage = state => state.notification.notificationsNextPage;
export const selectNotificationsTotalPages = state => state.notification.notificationsTotalPages;
export const selectNotificationsIsLoading = state => state.notification.notificationsIsLoading;

