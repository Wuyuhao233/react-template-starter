import axios from "axios";
const instance = axios.create({
  baseURL: "api1",
  timeout: 5000,
  withCredentials:true
});

export { instance };
