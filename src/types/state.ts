import { PaginationState } from '../reducers/pagination';
import { PostsState } from '../reducers/posts';
import { UsersState } from '../reducers/users';

export interface State {
  users: UsersState;
  posts: PostsState;
  pagination: PaginationState;
}
