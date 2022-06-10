import { Button, Form, Input } from "antd";

import React from "react";


export default function Login() {
  // 密码用md5加密
  const login =async (params) => {
   let res =await fetch(
    // 注册业务
    'apis/immp-user/api/v3/user/login',
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
    console.log(res)
  };
  return (
    <div style={{width:'50%'}}>
      <Form onFinish={login} labelAlign='left'>
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
