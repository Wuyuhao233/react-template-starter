import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import md5 from "md5";
import { Request } from "@/request/axios";
import { setLocalToken } from "@/utils";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function LoginPage() {
  const navigate = useNavigate();
  const onFinish = async ({ password, userName }) => {
    password = md5(password);
    const result = await Request?.loginUser({ userName, password });
    console.log(result);
    const { status, data } = result;

    if (status === 200) {
      if (data.desc === "成功") {
        message.success(
          data.desc,
          [1],
          // 消息关闭后再跳转
          (onclose = () => {
            const expire = dayjs().add(30, "minute").unix();
            setLocalToken({ value: data.data, expire });
            navigate("/home");
          })
        );
      } else {
        message.error(data.desc);
      }
    }
  };

  return (
    <div className="flexContainer">
      <div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
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
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
