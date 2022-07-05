import { getBaseUrl, getLocalToken, setLocalToken, tokenExpire } from "@/utils";
import { refreshTokenF } from "@/utils/async";
import axios from "axios";
import { Request } from ".";

// 设置一个Promise ，在refresh token之后，在拿新的token

export const instance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 5000,
  withCredentials: true,
});
//请求拦截 -- 在头部这里对token的时间进行判断，比较准确
let isRefreshing = false;
let waitingRefresh = Promise.resolve();

instance.interceptors.request.use(
  // login 不需要token
  async (config) => {
    const { url } = config;
    const expire = tokenExpire();
    if (url !== "immp-user/api/v3/user/login") {
      if (url !== "immp-user/api/v3/user/refreshToken") {
        if (expire > -9) {
          if (!isRefreshing) {
            isRefreshing = true;
            waitingRefresh = new Promise((resolve) => {
              Request.refreshToken().then((res) => {
                setLocalToken(res.data.data)
                console.log('sucess',res);
                resolve("sucess");
              });
            });
          }
          await waitingRefresh;
        }
      }
      let token = getLocalToken();
      // 这两者之间需要有空格
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (err) => {
    console.log("interceptors", err);
  }
);

instance.interceptors.response.use((res) => {
  return res;
});
