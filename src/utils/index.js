export const getLocalToken = () => {
  return window.localStorage.getItem("token");
};
export const setLocalToken = (token) => {
  window.localStorage.setItem("token", token);
};
