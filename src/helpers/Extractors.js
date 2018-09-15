import { Platform } from 'react-native';
import { FollowModes } from '../config';

export function extractImageSource(image) {
  return Platform.OS === 'ios' ? image.sourceURL : image.path;
}

export function extractTagPictureUri(tag) {
  return tag.picture;
}

export function extractTagName(tag) {
  return tag.tag_name;
}

export function extractTagID(tag) {
  return tag.tag_id;
}

export function extractPostPictureUri(post) {
  return post.post_picture;
}

export function extractPostID(post) {
  return post.id;
}

export function extractProfilePictureUri(post) {
  return post.profile_picture;
}

export function extractOwnerUsername(post) {
  return post.owner_username;
}

export function extractCaption(post) {
  return post.caption;
}

export function extractLikesCount(post) {
  return post.likes_count;
}

export function extractIsLiked(post) {
  return post.is_liked;
}

export function extractCommentsCount(post) {
  return post.comments_count;
}

export function extractPostDate(post) {
  return post.time;
}

export function extractUserFullName(user) {
  return user.fullname;
}

export function extractUserUsername(user) {
  return user.username;
}

export function extractUserProfilePictureUri(user) {
  return user.profile_picture;
}

export function extractNotificationType(notification) {
  return notification.notif_type;
}

export function extractNotificationSubjectUser(notification) {
  return notification.subject_user;
}

export function extractNotificationTime(notification) {
  return notification.time;
}

export function extractNotificationPostPicture(notification) {
  return notification.data.post_picture;
}

export function extractNotificationPostID(notification) {
  return notification.data.post_id;
}

export function extractNotificationProfilePicture(notification) {
  return notification.profile_picture;
}

export function extractIsPrivate(user) {
  return user.is_private;
}

export function extractFollowMode(user) {
  switch (user.following_status) {
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
