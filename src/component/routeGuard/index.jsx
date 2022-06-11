import { useMount } from "ahooks";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate, useResolvedPath } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { routeTable } from "../../router";
//递归查询对应的路由
// [{},{},{ ,[{}]}]
// path 的话，和路由表的一样
//子组件加载前，父组件会先渲染
const searchRoutePath = (path, routes) => {
  for (const item of routes) {
    if (path === item.path) {
      return item;
    }
    if (item.children) {
      return searchRoutePath(path, item.children);
    }
  }
};
// /home/homeson
export default function RouteGuard({ routes }) {
  const [crt] = useState(false);
  const navigate = useNavigate();
  // 可以进行判断，如果验证通过，则到url的路径

  /**
   * 写一个函数，对要去的url的auth进行判断，如果有auth， 则在进行判断是否登录过
   * 两个判断， 是否登录
   * token时间是否过期
   * 
   *  */ 


  /**
   * 已经挂载上了，通过link再去改变，不会再次调用
   * 如果是刷新，则会重新调用
   */
  useMount(() => {
    navigate("/home");
    console.log('mounted use' )
  });
  const element = useRoutes(routeTable);
  // 每次跳转时，可以获得最新的路径
  const path = useLocation();
  // const token = window.localStorage.getItem("token");
  // 判断是否有token !token -- 没有的情况为true
  console.log("location", "+", path.pathname);
  console.log('mounted','guard')
  return (
    <div>
      guard
      {element}
    </div>
  );
}
