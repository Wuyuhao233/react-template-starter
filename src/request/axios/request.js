import { getBaseUrl, getLocalToken } from "@/utils";
import { message } from "antd";
import axios from "axios";
export const instance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 5000,
  withCredentials: true,
});
//请求拦截
instance.interceptors.request.use(
  // login 不需要token

  (config) => {
    const { url } = config;
    console.log(url)
    if (url !== "immp-user/api/v3/user/login") {
      const token = getLocalToken();
      // 这两者之间需要有空格
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (err) => {
    console.log("interceptors", err);
  }
);
// 响应拦截
