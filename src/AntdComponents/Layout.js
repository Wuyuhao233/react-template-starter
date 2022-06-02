// import { Menu,Layout } from "antd"
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { getMenu } from "../utils/axios";
// 布局容器
const { Header, Content, Footer, Sider } = Layout;

export default function Lay() {
  const [menu, setMenu] = useState([]);
  const getIMenuInfo = async () => {
    let result = await getMenu();
    setMenu(result.data);
  };
  useEffect(() => {
    getIMenuInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Sider>
        <Menu items={menu}></Menu>
      </Sider>
      <Layout>
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
}
