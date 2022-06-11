import { Button, Form, Input, message } from "antd";
import md5 from "md5";
import { useNavigate } from "react-router";

import React from "react";
import { instance } from "../../utils/axios/request";
// axios返回的格式 {status,data:{data}}
export const getUserInfo = async (token) => {
  let userInfo = await instance.get("apis//immp-user/api/v3/user/currentUser/info", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return userInfo.data.data;
};

export const login = async (params) => {
  const _userName = params.userName;
  const _password = md5(params.password);
  const data1 = {
    userName: _userName,
    password: _password,
  };
  let result = await instance.post("apis/immp-user/api/v3/user/login", data1);
  // code 为number
  console.log(result)
  const { statusCode, data, desc } = result.data;
  if (result.status === 200) {
    if (statusCode === 0) {
      window.localStorage.setItem("username", params.userName);
      window.localStorage.setItem("token", data);
    } else {
      message.warning(desc);
    }
  }
  // config.headers.Authorization = 'Bearer ' + token.value;
  // 携带token去获取用户信息
  let userInfo = await getUserInfo(data);
  console.log(userInfo)
  return { data, userInfo };
};
const logout = () => {};
