export * from './PostsActions';
export * from './UsersActions';
export * from './BoardsActions';

const GlobalActions = {
  RESET_EVERYTHING: 'RESET_EVERYTHING',
};

export const globalReset = () => ({
  type: GlobalActions.RESET_EVERYTHING,
});

export default GlobalActions;
