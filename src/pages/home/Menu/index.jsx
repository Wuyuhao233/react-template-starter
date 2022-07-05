import { routes } from "@/router/routes";
import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { menuItem } from "./menuItems";
import UserInfo from "./UserInfo";

export default function MenuBar({ setVisible }) {
  const navigate = useNavigate();

  const itemClick = ({ key }) => {
    navigate(key);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "50%" }}>
        <Menu items={menuItem} mode="horizontal" onClick={itemClick} style={{ border: "none" }} />
      </div>
      <div>
        <UserInfo setVisible={setVisible} />
      </div>
    </div>
  );
}
