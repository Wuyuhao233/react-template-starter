import HomePage from "@/pages/home";
import Progress from "@/pages/home/Progress";
import Project from "@/pages/home/project";
import QC from "@/pages/home/QC";
import SafeControl from "@/pages/home/safeControl";
import LoginPage from "@/pages/login";
import { getLocalToken } from "@/utils";

import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMiddlewareRoutes } from "react-router-middleware-plus";

export default function RouterGuard() {
  //  需要在mount 时判断

  const UsecheckLogin = ({ children }) => {
    const token = getLocalToken();
    console.log('token',token)
    const navigate = useNavigate();
    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    });
    return token ? children : null;
  };
  const routes = [
    {
      path: "/",
      key: "index",
      element: <Navigate to={"/home"} />,
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
          path: "projectList",
          key: "project",
          element: <Project />,
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
  ];

  return useMiddlewareRoutes(routes);
}
