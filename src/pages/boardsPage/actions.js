import {RequestMethods, Server} from "../../config";

export const Actions = {
    GET_BOARDS_PHOTOS_NEXT_PAGE: 'GET_BOARDS_PHOTOS_NEXT_PAGE',
    GET_BOARDS_PHOTOS_NEXT_PAGE_SUCCESS: 'GET_BOARDS_PHOTOS_NEXT_PAGE_SUCCESS',
    GET_BOARDS_PHOTOS_NEXT_PAGE_FAIL: 'GET_BOARDS_PHOTOS_NEXT_PAGE_FAIL',
    RESET_BOARDS_PHOTOS: 'RESET_BOARDS_PHOTOS',
};

export const getBoardsPhotosNextPage = (boardID, boardsPhotosNext) => {
    return {
        type: Actions.GET_BOARDS_PHOTOS_NEXT_PAGE,
        payload: {
            request: {
                method: RequestMethods.GET,
                url: `${Server.GET_SELF_BOARDS_NEXT_PAGE}${boardID}/?page=${boardsPhotosNext}`,
            }
        }
    };
};