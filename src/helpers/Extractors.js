import { Platform } from 'react-native';

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
