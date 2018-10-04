import { FollowStatus } from '../config';

export interface PostDetails {
  owner_username: string;
  id: number;
  tags_list: string[];
  time: string;
  likes_count: number;
  is_liked: boolean;
  caption: string;
  comments_count: number;
  post_picture: string;
  profile_picture: string;
}

export interface Comment {
  id: number;
  comment: string;
  profile_picture: string;
  username: string;
  time: string;
}

export interface Board {
  name: string;
  id: number;
  count: number;
  last_pics: string[];
}

export interface Photo {
  id: number;
  post_picture: string;
}

export interface Tag {
  picture: string;
  tag_name: string;
  tag_id: number;
}

export interface UserInfo {
  username: string;
  fullname: string;
  bio: string;
  following: number;
  followers: number;
  email: string | undefined;
  profile_picture: string;
  following_status: FollowStatus;
  is_private: boolean;
}
