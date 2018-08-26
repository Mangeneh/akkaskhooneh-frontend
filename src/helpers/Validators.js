export const checkEmail = (email) => {
    let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    // return regex.test(email);
    return true;
};

export const checkPassword = (password) => {
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
    // return regex.test(password);
    return true;
};