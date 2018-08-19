const EmailReducer = (state = true, action) => {
    if (action.type === 'LOCALLY_VALIDATE_EMAIL') {
        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.warn("False");
            return false;
        }
        return true;
    }
    return state;
}