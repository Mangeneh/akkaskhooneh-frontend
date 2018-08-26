export const Actions = {
    MODE_CHANGED: 'PROFILE_EDIT_MODE_CHANGED',
    IMAGE_CHANGED: 'PROFILE_EDIT_IMAGE_CHANGED',
};

export const modeChanged = (mode) => {
    return {
        type: Actions.MODE_CHANGED,
        payload: mode
    }
};

export const imageChanged = (image) => {
    return {
        type: Actions.IMAGE_CHANGED,
        payload: image
    }
};