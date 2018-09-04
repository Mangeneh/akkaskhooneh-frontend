import {Server} from "../../config";

export const Actions = {
    BOARD_NAME_CHANGED: 'HOME_BOARD_NAME_CHANGED',
    CREATE_BOARD_FAIL: 'CREATE_BOARD_FAIL',
    CREATE_BOARD_SUCCESS: 'CREATE_BOARD_SUCCESS',
    CREATE_BOARD: 'CREATE_BOARD',
};

export const boardNameChanged = (boardName) => {
    return {
        type: Actions.BOARD_NAME_CHANGED,
        payload: boardName
    }
};

export const createBoard = (boardName) => {
    return {
        type: Actions.CREATE_BOARD,
        payload: {
            request: {
                method: 'POST',
                url: Server.CREATE_BOARD,
                data: {
                    name: boardName,
                }
            }
        }
    };
};