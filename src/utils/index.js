/**
 * localStorage 的token 操作
 */
// 需要对为null 时进行判断
export const getLocalToken = () => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  return token === null ? null : token.value;
};
export const setLocalToken = (token) => {
  window.localStorage.setItem("token", JSON.stringify(token));
};
export const clearToken = () => {
  window.localStorage.removeItem("token");
};
/**
 * localStorage 的user 操作
 */
export const getLocalUser = () => {
  return JSON.parse(window.localStorage.getItem("user"));
};
export const setLocalUser = (value) => {
  window.localStorage.setItem("user", value);
};
export const removeLocalUser = () => {
  window.localStorage.removeItem("user");
};

export const getBaseUrl = () => {
  return process.env.NODE_ENV === "development" ? "/apis" : window.location.pathname + "apis";
  //return 'http://192.168.188.218:30101';
  // return window.location.pathname + 'apis';
};
