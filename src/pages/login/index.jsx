import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import md5 from "md5";
import { Request } from "@/request/axios";
import { clearToken, setLocalToken } from "@/utils";
import { Link, Outlet, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useLoginUserMutation } from "@/store/api/apiSlice";
import { useSelector } from "react-redux";
import { useRequest } from "ahooks";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loading, run: loginUser } = useRequest(Request.loginUser, {
    manual: true,
    onSuccess: ({ data }) => {
      if (data.desc === "成功") {
        clearToken();
        setLocalToken( data.data );
        message.success(
          "登录成功",
          [1],
          (onclose = () => {
            navigate("/home");
          })
        );
      }
    },
  });

  const finshiLogin = ({ userName, password }) => {
    clearToken()
    password = md5(password);
    loginUser({ userName, password });
  };
  // spinning={!isSuccess}

  return (
    <Spin spinning={false}>
      <div className="flexContainer">
        <div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={finshiLogin}
          >
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
}
