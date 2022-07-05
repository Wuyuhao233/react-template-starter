import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MenuBar from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import { useMount, useRequest, useUnmount } from "ahooks";
import { clearToken, getLocalToken } from "@/utils";
import { Request } from "@/request/axios";
import { inject } from "@/store/user/userSlice";
import { Drawer, message } from "antd";
import { useState } from "react";
import { useRef } from "react";
import dayjs from "dayjs";

export default function HomePage() {

  const [visible, setVisible] = useState(false);
  const token = getLocalToken();
  const navigate = useNavigate();

  const sendRequest =async  () => { 
  let res= await Request.getUserInfo()
  console.log(res)
   }

  return (
    <div>
      <MenuBar setVisible={setVisible} />
      <button onClick={sendRequest}>send</button>
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
