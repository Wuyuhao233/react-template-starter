import { getLocalToken } from "@/utils";
import { message } from "antd";
import axios from "axios";
export const instance = axios.create({
  baseURL: "http://localhost:9000/api1",
  timeout: 5000,
  withCredentials: true,
});
//请求拦截
instance.interceptors.request.use(
  (config) => {
    const token = getLocalToken();
    config.headers.Authorization = "Bearer" + token;
    return config;
  },
  (err) => {
    console.log(err);
  }
);
// 响应拦截

