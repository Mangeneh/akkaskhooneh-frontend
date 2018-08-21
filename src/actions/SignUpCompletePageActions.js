export const SignUpCompletePageActions = {
    MODE_CHANGED: 'MODE_CHANGED',
};

export const modeChanged = (mode) => {
    return {
        type: SignUpCompletePageActions.MODE_CHANGED,
        payload: mode
    }
};