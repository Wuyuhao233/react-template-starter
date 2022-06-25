import { instance } from "./request";

export const Request = {
    loginUser :(params) => instance.post('apis/immp-user/api/v3/user/login',params)
}
