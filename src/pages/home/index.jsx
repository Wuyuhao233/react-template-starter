import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MenuBar from "./Menu";
import { useDispatch } from "react-redux";
import { useMount, useUnmount } from "ahooks";
import { clearToken, getLocalToken, getLocalUser } from "@/utils";
import { Request } from "@/request/axios";
import { getUserInfo, inject } from "@/store/user/userSlice";
import { Drawer, message } from "antd";
import { useState } from "react";
import { useRef } from "react";
import dayjs from "dayjs";

export default function HomePage() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const token = getLocalToken();
  const navigate = useNavigate();

  // axios 报错后不会再执行下去,使用try catch 来捕获错误
  // const getUserInfo = async () => {
  //   try {
  //     const result = await Request.getUserInfo();
  //     dispatch(inject({ value: result.data.data }));
  //   } catch (error) {
  //     clearToken();
  //     message.info(
  //       // 这里会出现两次提醒，
  //       "登陆信息过期，请重新登陆",
  //       [1],
  //       (onclose = () => {
  //         navigate("/login");
  //       })
  //     );
  //   }
  // };

  // user 信息是在此时被注入到redux，所以在这里开启对user的验证
  //  会执行两次，请求数据后，在本地加个user 的缓存，进行判断
  // token被更换时，需要写
  /**
   * 每次打开新的页面确实需要请求，但是需要对请求的code 进行判断。
   * 只有等于401时，则需要重新登陆
   * 本地需要缓存user，以及user写入的状态
   */

  const getUser = async () => {
    await dispatch(getUserInfo());
    const { status } = getLocalUser();
    if (status === "waiting") {
      navigate("/login");
    }
  };

  useMount(() => {
    if (token) {
      getUser();
    }
  });
  return (
    <div>
      <MenuBar setVisible={setVisible} />
      <Drawer
        visible={visible}
        mask={false}
        onClose={() => {
          setVisible(false);
        }}
      >
        <p>name</p>
        <p>id</p>
        <hr />
        <p>charater</p>
      </Drawer>
      <Outlet />
    </div>
  );
}
