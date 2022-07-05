import dayjs from "dayjs";
/**
 * localStorage 的token 操作
 */

// 需要对为null 时进行判断
export const getLocalToken = () => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  return token === null ? null : token.value;
};
export const setLocalToken = (value) => {
  const token1 = {
    value,
    expire: dayjs().add(10, "minutes").format("YYYY-MM-DD HH:mm"),
  };
  window.localStorage.setItem("token", JSON.stringify(token1));
};
export const clearToken = () => {
  window.localStorage.removeItem("token");
};
// 是 此时-过期的时间：
export const tokenExpire = () => {
  const token = JSON.parse(window.localStorage.getItem("token"));

  if (token) {
    const expireDiff = dayjs().diff(dayjs(token.expire), "minute");
    return expireDiff;
  }
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
//return 'http://192.168.188.218:30101';
// return window.location.pathname + 'apis';
export const getBaseUrl = () => {
  return process.env.NODE_ENV === "development" ? "/apis" : window.location.pathname + "apis";
};
