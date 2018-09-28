import { IPaginationState } from '../reducers/pagination';
import { IUsersState } from '../reducers/users';
import { IPost } from './api';

export interface IState {
  users: IUsersState;
  posts: {
    [field: string]: IPost;
  };
  pagination: IPaginationState;
}
