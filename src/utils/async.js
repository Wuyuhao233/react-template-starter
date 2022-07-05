import { clearToken, setLocalToken, tokenExpire } from "./index";
import { Request } from "../request/axios/index";

export const refreshTokenF = async () => {
  // 确保刷新请求实在token过期时发出的
  const expire = tokenExpire();
  if (expire > -9) {
    return new Promise((resolve) => {
      Request.refreshToken().then((res) => {
        setLocalToken(res.data.data);
        resolve("sucess");
      });
    });
  }
};
