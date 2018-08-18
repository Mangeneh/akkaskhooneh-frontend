const LoginReducer = (state = 'NORMAL', action) => {
    switch (action.type) {
        case 'LOGIN':

            break;

    }
    if (action.type === 'LOGIN'){

    }
    switch (state) {
        case 'NORMAL':
            return 'ERROR';
        case 'ERROR':
            return 'LOADING';
        default:
            return 'NORMAL';
    }
};

export default LoginReducer;