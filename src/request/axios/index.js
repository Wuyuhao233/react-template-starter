import axios from "axios";
import { instance } from "./request";

export const Request = {
  loginUser: (params) => instance.post("immp-user/api/v3/user/login", params),
  getUserInfo: () => instance.get("immp-user/api/v3/user/currentUser/info"),
  refreshToken: () => instance.post('immp-user/api/v3/user/refreshToken')
};
