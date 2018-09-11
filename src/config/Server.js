export const Server = {
  // Auth
  LOGIN_USER: '/auth/login/',
  CHECK_EMAIL: '/auth/checkemail/',
  SIGN_UP_USER: '/auth/register/',
  UPDATE_USER: '/social/profile/',
  UPDATE_ACCESS_TOKEN: '/auth/token/refresh/',
  // Social - Profile
  EDIT_PROFILE: '/auth/editprofile/',
  CHANGE_PROFILE_PIC: '/social/change-pic/',
  CHANGE_PASSWORD: '/auth/changepassword/',
  // Social - Posts
  GET_SELF_PHOTOS_NEXT_PAGE: '/social/pictures/?page=',
  GET_SELF_BOARDS_NEXT_PAGE: '/social/boards/?page=',
  GET_OTHERS_PHOTOS_NEXT_PAGE: '/social/pictures/',
  GET_OTHERS_BOARDS_NEXT_PAGE: '/social/boards/',
  GET_HOME_POSTS_NEXT_PAGE: '/social/feed/?page=',
  // Social - Boards
  CREATE_BOARD: '/social/create-new-board/',
  ADD_POST_TO_BOARD: '/social/addnewposttoboard/',
  GET_BOARDS_DETAILS: '/social/boardsdetails/',
  DELETE_BOARD: '/social/deleteboard/',
  // Social - Post Related
  SEND_POST: '/social/create-new-post/',
  GET_POST_INFO: '/social/post/',
  LIKE_DISLIKE: '/social/like/',
  COMMENT: '/social/comment/',
  GET_COMMENTS_LIST: '/social/comment/',
  // Tags
  GET_SEARCH_TOP_TAGS: '/social/tophashtag/?page=',
  GET_TAGS_PHOTOS_NEXT_PAGE: '/social/tag/',
  // Search
  GET_SEARCH_USERS_RESULTS: '/social/search/user/',
  GET_SEARCH_TAGS_RESULTS: '/social/search/tags/',
  GET_SEARCH_FOLLOWERS_RESULTS: '/social/search/followers/',
  GET_SEARCH_FOLLOWINGS_RESULTS: '/social/search/following/',
};
