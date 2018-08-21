export const Actions = {
    MODE_CHANGED: 'PROFILE_EDIT_MODE_CHANGED',
};

export const modeChanged = (mode) => {
    return {
        type: Actions.MODE_CHANGED,
        payload: mode
    }
};