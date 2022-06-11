import { Button, Form, Input, message } from "antd";
import md5 from "md5";
import { useNavigate,useLocation } from "react-router-dom";

import React from "react";
import { instance } from "../../utils/axios/request";
import { useAuth } from "../../myHooks";

export default function Login() {
  const path = useLocation()
  console.log('login',path)
  const navigate = useNavigate();
  const {login} = useAuth()
  const handleSubmit = async(params) => { 
    await login(params)
    // navigate('/home')
   }
  //登录成功后返回一个token
  // 密码用md5加密

  // const login = async (params) => {
  //   const _userName = params.userName;
  //   const _password = md5(params.password);
  //   const data1 = {
  //     userName: _userName,
  //     password: _password,
  //   };
  //   let result = await instance.post("apis/immp-user/api/v3/user/login", data1);
  //   // code 为number
  //   const { statusCode, data, desc } = result.data;
  //   if (result.status === 200) {
  //     if (statusCode === 0) {
  //       window.localStorage.setItem("username", params.userName);
  //       window.localStorage.setItem("token", data);
  //       navigate("/home");
  //     } else {
  //       message.warning(desc);
  //     }
  //   }
  //   // config.headers.Authorization = 'Bearer ' + token.value;
  //   // 携带token去获取用户信息
  //   let userInfo = await instance.get("apis//immp-user/api/v3/user/currentUser/info", {
  //     headers: {
  //       Authorization: `Bearer ${data}`,
  //     },
  //   });
  //   console.log(userInfo);
  // };
  return (
    <div style={{ width: "50%" }}>
      <Form onFinish={handleSubmit} labelAlign="left">
        <Form.Item label="用户名" name={"userName"} rules={[{ required: true, message: "请输入用户名" }]}>
          <Input type={"text"} placeholder="please enter your username" />
        </Form.Item>
        <Form.Item label="密码" name={"password"} rules={[{ required: true, message: "请输入密码" }]}>
          <Input type={"password"} placeholder="please enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
