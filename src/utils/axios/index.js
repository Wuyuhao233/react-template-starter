import { instance } from "./request";

export const getMenu = () => instance("/menu");
export const getTree = () => instance('tree')
