import HomePage from "@/pages/home";
import Homeson from "@/pages/home/homeson";
import LoginPage from "@/pages/login";
import { getLocalToken } from "@/utils";

import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMiddlewareRoutes } from "react-router-middleware-plus";

export default function RouterGuard() {
  //  需要在mount 时判断

  const UsecheckLogin = ({children}) => {
    const token = getLocalToken();
    const navigate = useNavigate();
    useEffect(() => {
      if (!token) {
        navigate('/login')
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
          path: "homeson",
          key: "homeson",
          element: <Homeson />,
        },
      ],
    },
  ];

  return useMiddlewareRoutes(routes);
}
