import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";
import { handleCode, handleMessage } from "./requestHandler";
import { ElMessage } from "element-plus";

// console.log(import.meta);

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

// console.log(token.value);
const useMock = import.meta.env.VITE_USE_MOCK === "true";
const baseURL = useMock ? "" : import.meta.env.VITE_APP_API_BASE_URL;
// console.log(baseURL);

// 创建 Axios 实例
const http: AxiosInstance = axios.create({
  baseURL, // 设置请求的根路径
  timeout: 30000, // 设置请求超时时间
});

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么，例如添加 token
    return config;
  },
  (error: any) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse | any) => {
    // 对响应数据做些什么
    if (response?.data) {
      let data = response?.data;
      if (data?.resultCode) {
        if (data?.resultCode == 200) {
          return response;
        } else {
          ElMessage.error(data.message);
          return Promise.reject(data);
        }
      } else {
        //下载
        return response;
      }
    }
  },
  (error: any) => {
    // const { response } = error;
    if (error.response && error.response.data) {
      // const { status, data } = response;
      // handleCode(status, data.msg);
      handleCode(error);
    } else {
      handleMessage(error);
    }
    return Promise.reject(error);
  }
);

const basisConfig = {
  headers: {
    Authorization: userInfo.value.token,
  },
};

// 封装各种类型的请求方法
const request = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return http.get(url, { ...basisConfig, ...config });
  },
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return http.post(url, data, { ...basisConfig, ...config });
  },
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return http.put(url, data, { ...basisConfig, ...config });
  },
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return http.delete(url, { ...basisConfig, ...config });
  },
};

export default request;
