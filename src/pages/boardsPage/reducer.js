import {Actions} from './actions';

const INITIAL_STATE = {
    boardsPhotos: [],
    boardsPhotosNextPage: 1,
    boardsPhotosTotalPages: 1,
    boardsPhotosIsLoading: false
};

export default (state = INITIAL_STATE, action) => {
    const {GET_BOARDS_PHOTOS_NEXT_PAGE, GET_BOARDS_PHOTOS_NEXT_PAGE_FAIL, GET_BOARDS_PHOTOS_NEXT_PAGE_SUCCESS, RESET_BOARDS_PHOTOS} = Actions;
    switch (action.type) {
        case GET_BOARDS_PHOTOS_NEXT_PAGE:
            return {...state, boardsPhotosIsLoading: true}
        case GET_BOARDS_PHOTOS_NEXT_PAGE_SUCCESS:
            return {
                ...state,
                boardsPhotos: state.boardsPhotos.concat(action.payload.data.results),
                boardsPhotosTotalPages: action.payload.data.total_pages,
                boardsPhotosNextPage: state.boardsPhotosNextPage + 1,
                boardsPhotosIsLoading: false
            };
        case RESET_BOARDS_PHOTOS:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export const selectBoardsPhotos = (state) => state.boardsPage.boardsPhotos;
export const selectBoardsPhotosTotalPages = (state) => state.boardsPage.boardsPhotosTotalPages;
export const selectBoardsPhotosNextPage = (state) => state.boardsPage.boardsPhotosNextPage;
export const selectBoardsPhotosIsLoading = (state) => state.boardsPage.boardsPhotosIsLoading;