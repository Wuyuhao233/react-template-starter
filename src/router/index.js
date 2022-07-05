import { useMiddlewareRoutes } from "react-router-middleware-plus";
import { routes } from "./routes";

export default function RouterGuard() {
  return useMiddlewareRoutes(routes);
}