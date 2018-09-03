import {} from '../actions/BoardsActions';

const INITIAL_STATE = {
    selfBoards: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
