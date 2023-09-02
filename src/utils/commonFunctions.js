export const getUserData = (userId, userArray) => {
  return userArray?.find((data) => data.id === userId);
};
