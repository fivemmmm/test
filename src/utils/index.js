//axios 基础的封装
import axios from "axios";

const httpInstance = axios.create({
  baseURL: "http://localhost:3000/cat",
  timeout: 5000,
});

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (e) => Promise.reject(e)
);

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    return Promise.reject(e);
  }
);

export default httpInstance;
