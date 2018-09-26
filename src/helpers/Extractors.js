import { Platform } from 'react-native';
import { FollowModes } from '../config';

export const extractPreviousAction = action => action.meta.previousAction;
export const extractImageSource = image => (Platform.OS === 'ios' ? image.sourceURL : image.path);
export const extractTagPictureUri = tag => tag.picture;
export const extractTagName = tag => tag.tag_name;
export const extractTagID = tag => tag.tag_id;
export const extractPostPictureURI = post => post.post_picture;
export const extractPostID = post => post.id;
export const extractProfilePictureUri = post => post.profile_picture;
export const extractOwnerUsername = post => post.owner_username;
export const extractCaption = post => post.caption;
export const extractLikesCount = post => post.likes_count;
export const extractIsLiked = post => post.is_liked;
export const extractCommentsCount = post => post.comments_count;
export const extractPostDate = post => post.time;
export const extractUserFullName = user => user.fullname;
export const extractUserUsername = user => user.username;
export const extractUserProfilePictureUri = user => user.profile_picture;
export const extractNotificationType = notification => notification.notif_type;
export const extractNotificationSubjectUser = notification => notification.subject_user;
export const extractNotificationObjectUser = notification => notification.data.username;
export const extractNotificationTime = notification => notification.time;
export const extractNotificationPostPicture = notification => notification.data.post_picture;
export const extractNotificationPostID = notification => notification.data.post_id;
export const extractNotificationProfilePicture = notification => notification.profile_picture;
export const extractIsPrivate = user => user.is_private;

export function extractFollowMode(followStatus) {
  switch (followStatus) {
    case 1:
      return FollowModes.FOLLOWED;
    case 2:
      return FollowModes.REQUESTED;
    case 3:
      return FollowModes.NOT_FOLLOWED;
    default:
      return FollowModes.NOT_FOLLOWED;
  }
}
