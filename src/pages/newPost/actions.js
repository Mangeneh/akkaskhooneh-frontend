export const Actions = {
    PIC_SELECTED: 'NEW_POST_PIC_SELECTED',
};

export const picSelected = (selectedPics) => {
    return {
        type: Actions.PIC_SELECTED,
        payload: selectedPics,
    }
};