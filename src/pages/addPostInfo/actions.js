import FormData from 'form-data';
import { RequestMethods, Server } from '../../config';

export const Actions = {
  SEND_POST: 'SEND_POST',
  SEND_POST_SUCCESS: 'SEND_POST_SUCCESS',
  SEND_POST_FAIL: 'SEND_POST_FAIL',
  NORMALIZE: 'ADD_POST_INFO_NORMALIZE',
};

export const normalize = () => ({
  type: Actions.NORMALIZE,
});

export const sendPost = (imageSource, caption, tags) => {
  const formData = new FormData({});
  formData.append('picture', {
    uri: imageSource,
    name: 'my_photo.jpg',
    type: 'image/jpeg',
  });
  formData.append('caption', caption);
  if (tags.length > 0) {
    formData.append('tags', tags.toString());
  }
  return {
    type: Actions.SEND_POST,
    payload: {
      request: {
        method: RequestMethods.POST,
        url: Server.SEND_POST,
        data: formData,
      },
    },
  };
};
