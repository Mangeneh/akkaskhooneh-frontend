import { IPost } from './api';
import { IPagination } from './pagination';

export interface IState {
  pagination: {
    [field: string]: IPagination;
  };
  posts: {
    [field: string]: IPost;
  };
}
