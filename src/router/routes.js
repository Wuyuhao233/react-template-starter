import NotFound from "@/pages/NotFound";
import HomePage from "@/pages/home";
import Progress from "@/pages/home/Progress";
import Project from "@/pages/home/project";
import QC from "@/pages/home/QC";
import SafeControl from "@/pages/home/safeControl";
import LoginPage from "@/pages/login";

import React from "react";
import { Navigate } from "react-router-dom";

import { useCheckAuth, UsecheckLogin } from "@/hooks";
import ProjectList from "@/pages/home/project/projectList";
import BigData from "@/pages/home/project/BigData";

export const routes = [
  {
    path: "/",
    key: "index",
    element: <Navigate to={"/login"} />,
  },
  {
    path: "/login",
    key: "login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    key: "home",
    middleware: [UsecheckLogin],
    element: <HomePage />,
    children: [
      {
        path: "prjManage",
        key: "项目管理",
        element: <Project />,
        children: [
          {
            path: "project",
            key: "项目列表",
            // middleware:[useCheckAuth],
            component: <ProjectList />,
          },
          {
            path: "bigData",
            key: "智慧大数据",
            component: <BigData />,
          },
        ],
      },
      {
        path: "ceju",
        key: "ceju",
        element: <QC />,
      },
      {
        path: "tower",
        key: "tower",
        element: <SafeControl />,
      },
      {
        path: "processCheck",
        key: "processCheck",
        element: <Progress />,
      },
    ],
  },
  // 放在最后实现404匹配
  {
    path: "*",
    key: "notFound",
    element: <NotFound />,
  },
];
