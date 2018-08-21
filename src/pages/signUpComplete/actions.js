export const Actions = {
    MODE_CHANGED: 'SIGN_UP_COMPLETE_MODE_CHANGED',
};

export const modeChanged = (mode) => {
    return {
        type: Actions.MODE_CHANGED,
        payload: mode
    }
};