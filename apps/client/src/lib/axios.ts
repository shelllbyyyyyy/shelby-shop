import Axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export class AxiosManager {
  public readonly axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });

    this.axios.interceptors.request.use(this.authRequestInterceptor);
  }

  private async authRequestInterceptor(
    axiosConfig: InternalAxiosRequestConfig
  ) {
    const token = localStorage.getItem("access_token");

    if (axiosConfig.headers) {
      if (token) {
        axiosConfig.headers.authorization = `Bearer ${token}`;
      }
      axiosConfig.headers.Accept = "application/json";
    }

    return axiosConfig;
  }
}

// will be used in SSR API Requests
export const { axios } = new AxiosManager();
