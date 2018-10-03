export enum Server {
  // Auth
  LOGIN_USER = '/auth/login/',
  CHECK_EMAIL = '/auth/checkemail/',
  SIGN_UP_USER = '/auth/register/',
  UPDATE_ACCESS_TOKEN = '/auth/token/refresh/',
  SEND_EMAIL = '/auth/forgotpassword/',
  SEND_TOKEN = '/auth/forgotpassword/verify/',
  GET_NEW_PASS = '/auth/forgotpassword/complete/',
  // Social - Profile
  UPDATE_USER_INFO = '/social/profile/',
  EDIT_PROFILE = '/auth/editprofile/',
  CHANGE_PROFILE_PIC = '/social/change-pic/',
  CHANGE_PASSWORD = '/auth/changepassword/',
  CHANGE_PRIVATE_STATUS = '/auth/change/status/',
  // Social - Posts
  GET_BOARDS = '/social/boards/',
  GET_HOME_POSTS = '/social/feed/',
  GET_USER_PHOTOS = '/social/pictures/',
  // Social - Boards
  CREATE_BOARD = '/social/create-new-board/',
  ADD_POST_TO_BOARD = '/social/addnewposttoboard/',
  GET_BOARD_DETAILS = '/social/boardsdetails/',
  DELETE_BOARD = '/social/deleteboard/',
  // Social - Post Related
  SEND_POST = '/social/create-new-post/',
  GET_POST_DETAILS = '/social/post/',
  LIKE_DISLIKE = '/social/like/',
  COMMENT = '/social/comment/',
  GET_COMMENT_LIST = '/social/comment/',
  // Social - Users
  FOLLOW_REQUEST = '/social/request/',
  DELETE_FOLLOW_REQUEST = '/social/request/delete/',
  UN_FOLLOW_REQUEST = '/social/unfollow/',
  FOLLOW_REQUEST_RESPONSE = '/social/request/accept/',
  // Tags
  GET_TOP_TAGS = '/social/tophashtag/',
  GET_TAG_PHOTOS = '/social/tag/',
  // Search
  GET_SEARCH_USERS_RESULTS = '/social/search/user/',
  GET_SEARCH_TAGS_RESULTS = '/social/search/tags/',
  GET_SEARCH_FOLLOWERS_RESULTS = '/social/search/followers/',
  GET_SEARCH_FOLLOWINGS_RESULTS = '/social/search/following/',
  GET_NOTIFICATIONS = '/social/notification/',
}
