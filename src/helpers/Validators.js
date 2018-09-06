export const checkEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export const checkPassword = (password) => {
  const regex = /(?=.*\d)(?=.*[a-zA-Z]).{6,}/;
  return regex.test(password);
};

export const checkUsername = (username) => {
  const regex = /^(?=.*\w)\w{4,}$/;
  return regex.test(username);
};
