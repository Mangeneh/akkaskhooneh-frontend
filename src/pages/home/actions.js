import {Server} from "../../config";

export const Actions = {
    BOARD_NAME_CHANGED: 'HOME_BOARD_NAME_CHANGED',
};

export const boardNameChanged = (boardName) => {
    return {
        type: Actions.BOARD_NAME_CHANGED,
        payload: boardName
    }
};
