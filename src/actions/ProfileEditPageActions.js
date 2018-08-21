export const ProfileEditPageActions = {
    MODE_CHANGED: 'MODE_CHANGED',
};

export const modeChanged = (mode) => {
    return {
        type: ProfileEditPageActions.MODE_CHANGED,
        payload: mode
    }
};