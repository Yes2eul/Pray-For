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

export const validateDate = (dateString) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;

  const dateComponents = dateString.split("-");
  const year = parseInt(dateComponents[0], 10);
  const month = parseInt(dateComponents[1], 10) - 1;
  const day = parseInt(dateComponents[2], 10);
  const date = new Date(year, month, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
  );
};
