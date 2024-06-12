import { appConfig } from '@/config/appConfig';
import Axios, { InternalAxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }
  return config;
}

export const axios = Axios.create({
  baseURL: appConfig.appApiUrl,
});

// TODO: Currently is unnecessary
// axios.interceptors.request.use(authRequestInterceptor);
// axios.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     const message = error.response?.data?.message || error.message;
//     console.log({ message });
//     return Promise.reject(error);
//   },
// );
