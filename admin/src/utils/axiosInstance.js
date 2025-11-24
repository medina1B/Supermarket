import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8800/api/auth",
  withCredentials: true,
});

export default instance;
