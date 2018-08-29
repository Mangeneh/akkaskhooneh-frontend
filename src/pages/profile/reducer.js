import {Actions} from './actions';

const INITIAL_STATE = {
    photos: [],
    photosNext: 1,
    isLoading: true,
    fetchStatus: false
};

export default (state = INITIAL_STATE, action) => {
    const {GET_PHOTOS_NEXT_PAGE_SUCCESS, GET_PHOTOS_NEXT_PAGE} = Actions;
    switch (action.type) {
        case GET_PHOTOS_NEXT_PAGE:
            console.log(action);
            return {...state, fetchStatus: true};
        case GET_PHOTOS_NEXT_PAGE_SUCCESS:
            console.log(action);
            return {
                ...state,
                photosNext: state.photosNext+1,
                photos: state.photos.concat(action.payload.data.results),
                isLoading: false,
                fetchStatus: false
            };
        default:
            return state;
    }
}