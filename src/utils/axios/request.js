import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3010",
  timeout: 5000,
});

export { instance };
