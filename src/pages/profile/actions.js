export const Actions = {
    GET_PHOTOS_NEXT_PAGE: 'GET_PHOTOS_NEXT_PAGE',
    GET_PHOTOS_NEXT_PAGE_SUCCESS: 'GET_PHOTOS_NEXT_PAGE_SUCCESS',
    GET_PHOTOS_NEXT_PAGE_FAIL: 'GET_PHOTOS_NEXT_PAGE_FAIL',
};

export const getPhotosNextPage = (photosNext) => {
    return {
        type: Actions.GET_PHOTOS_NEXT_PAGE,
        payload: {
            request: {
                method: 'GET',
                url: `/social/pictures/?page=${photosNext}`,
            }
        }
    };

};