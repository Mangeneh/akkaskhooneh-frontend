import { RequestMethods, Server } from '../../config';

export const NotificationActions = {
  SEND_FOLLOW_RESPONSE: 'SEND_FOLLOW_RESPONSE',
  SEND_FOLLOW_RESPONSE_SUCCESS: 'SEND_FOLLOW_RESPONSE_SUCCESS',
  SEND_FOLLOW_RESPONSE_FAIL: 'SEND_FOLLOW_RESPONSE_FAIL',
};

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
