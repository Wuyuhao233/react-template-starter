import HomePage from "../component/home";
import Homeson from "../component/home/homeson";
import Login from "../component/login";
import White from "../component/White";

export const routeTable = [
  {
    path: "/",
    element: <White />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <HomePage />,
    children: [
      {
        path: "homeson",
        element: <Homeson />,
      },
    ],
  },
];
