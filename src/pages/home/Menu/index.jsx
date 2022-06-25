import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";

export default function MenuBar({setVisible}) {
  const navigate = useNavigate();
  const items = [
    {
      label: "项目管理",
      key: "project",
      children: [{ label: "项目列表", key: "projectList" }],
    },
    {
      label: "质量管理",
      key: "QC",
      children: [{ label: "测距巡到位", key: "ceju" }],
    },
    {
      label: "安全管理",
      key: "SAFE",
      children: [{ label: "塔机", key: "tower" }],
    },
    {
      label: "进度管理",
      key: "process",
      children: [{ label: "进度查看", key: "processCheck" }],
    },
  ];
  const itemClick = ({ key }) => {
    navigate(key);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "50%" }}>
        <Menu items={items} mode="horizontal" onClick={itemClick} style={{ border: "none" }} />
      </div>
      <div>
        <UserInfo setVisible={setVisible} />
      </div>
    </div>
  );
}
