import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "./Menu";
import { useDispatch } from "react-redux";
import { useMount } from "ahooks";
import { getLocalToken } from "@/utils";
import { Request } from "@/request/axios";
import { inject } from "@/store/user/userSlice";
import { Drawer } from "antd";
import { useState } from "react";

export default function HomePage() {
  const [visible, setVisible] = useState(false);
  const token = getLocalToken();
  const getUserInfo = async () => {
    const result = await Request.getUserInfo();
    // 将用户信息存入store内
    dispatch(inject({ value: result.data.data }));
  };

  useMount(() => {
    if (token) {
      getUserInfo();
    }
  });

  //  获取到initial的整个对象
  const dispatch = useDispatch();

  return (
    <div>
      <MenuBar setVisible={setVisible} />
      <Drawer visible={visible} mask={false} onClose={() => { setVisible(false) }}>
        <p>name</p>
        <p>id</p>
        <hr />
        <p>charater</p>
      </Drawer>
      <Outlet />
    </div>
  );
}
