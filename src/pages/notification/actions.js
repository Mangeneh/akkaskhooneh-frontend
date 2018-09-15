import { RequestMethods, Server } from '../../config';

export const NotificationActions = {
  GET_NOTIFICATION_NEXT_PAGE: 'GET_NOTIFICATION_NEXT_PAGE',
  GET_NOTIFICATION_NEXT_PAGE_SUCCESS: 'GET_NOTIFICATION_NEXT_PAGE_SUCCESS',
  GET_NOTIFICATION_NEXT_PAGE_FAIL: 'GET_NOTIFICATION_NEXT_PAGE_FAIL',
  REFRESH_NOTIFICATION: 'REFRESH_NOTIFICATION',
  REFRESH_NOTIFICATION_SUCCESS: 'REFRESH_NOTIFICATION_SUCCESS',
  REFRESH_NOTIFICATION_FAIL: 'REFRESH_NOTIFICATION_FAIL',
};

export const refreshNotifications = () => ({
  type: NotificationActions.REFRESH_NOTIFICATION,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_NOTIFICATIONS}1`,
    },
  },
});

export const getNotifications = notificationsNext => ({
  type: NotificationActions.GET_NOTIFICATION_NEXT_PAGE,
  payload: {
    request: {
      method: RequestMethods.GET,
      url: `${Server.GET_NOTIFICATIONS}${notificationsNext}`,
    },
  },
});
