export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateName = (name) => {
  const regex = /^[가-힣]{2,}$/;
  return regex.test(name);
};

export const validateChurch = (church) => {
  const regex = /^[가-힣]{2,}$/;
  return regex.test(church);
};
