import { instance } from "./request";

export const getMenu = () => {
  return instance("/menu");
};
