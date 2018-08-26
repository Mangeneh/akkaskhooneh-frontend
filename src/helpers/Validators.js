export const checkEmail = (email) => {
    let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

export const checkPassword = (password) => {
    let regex = /(?=.*\d)(?=.*[a-zA-Z]).{6,}/;
    return regex.test(password);
};

export const checkUsername = (username) => {
    let regex = /^(?=.*\w)\w{4,}$/;
    return regex.test(username);
};