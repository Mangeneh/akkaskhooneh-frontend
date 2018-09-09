import { Platform } from 'react-native';

export function extractImageSource(image) {
  const imageSource = Platform.OS === 'ios' ? image.sourceURL : image.path;
  return imageSource;
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
