import {Server} from "../../config";

export const Actions = {
    SEND_POST : 'SEND_POST',
    SEND_POST_SUCCESS : 'SEND_POST_SUCCESS',
    SEND_POST_FAIL : 'SEND_POST_FAIL',
};

export const sendPost = (post) => {
    return {
        type: Actions.SEND_POST,
        payload: {
            request: {
                method: 'POST',
                url: Server.SEND_POST,
                data : post
            }
        }
    };
};