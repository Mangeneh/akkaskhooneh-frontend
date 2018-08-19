const NameReducer = (state = '', action) => {
    if (action.type === 'UPDATE_NAME') {
        return action.payload;
    }
    return state;
};

export default NameReducer;