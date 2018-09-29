import { IPaginationState } from '../reducers/pagination';
import { IPostsState } from '../reducers/posts';
import { IUsersState } from '../reducers/users';

export interface IState {
  users: IUsersState;
  posts: IPostsState;
  pagination: IPaginationState;
}
