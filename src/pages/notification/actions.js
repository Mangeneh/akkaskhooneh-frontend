import { RequestMethods, Server } from '../../config';

export const NotificationActions = {
  GET_NOTIFICATION_NEXT_PAGE: 'GET_NOTIFICATION_NEXT_PAGE',
  GET_NOTIFICATION_NEXT_PAGE_SUCCESS: 'GET_NOTIFICATION_NEXT_PAGE_SUCCESS',
  GET_NOTIFICATION_NEXT_PAGE_FAIL: 'GET_NOTIFICATION_NEXT_PAGE_FAIL',
  REFRESH_NOTIFICATION: 'REFRESH_NOTIFICATION',
  REFRESH_NOTIFICATION_SUCCESS: 'REFRESH_NOTIFICATION_SUCCESS',
  REFRESH_NOTIFICATION_FAIL: 'REFRESH_NOTIFICATION_FAIL',
  SEND_FOLLOW_RESPONSE: 'SEND_FOLLOW_RESPONSE',
  SEND_FOLLOW_RESPONSE_SUCCESS: 'SEND_FOLLOW_RESPONSE_SUCCESS',
  SEND_FOLLOW_RESPONSE_FAIL: 'SEND_FOLLOW_RESPONSE_FAIL',
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

export const respondToFollowRequest = (accept, username) => ({
  type: NotificationActions.SEND_FOLLOW_RESPONSE,
  payload: {
    request: {
      method: RequestMethods.POST,
      url: Server.FOLLOW_REQUEST_RESPONSE,
      data: {
        accept,
        username,
      },
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
