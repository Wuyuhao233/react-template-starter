import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";

export default function UserInfo({setVisible}) {
  const { value } = useSelector((store) => store.user);
  return (
    <div onClick={() => { setVisible(true) }}>
      <Avatar size={"large"} >{value.realName}</Avatar>
    </div>
  );
}
