import { appConfig } from '@/config/appConfig';
import storage from '@/utils/storage';
import Axios, { InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  // const token = localStorage.getItem('token');
  // if (token) {
  //   const decodedToken = jwtDecode(token);
  //   const currentDate = new Date();
  //   if (decodedToken && decodedToken.exp! * 1000 < currentDate.getTime()) {
  //     localStorage.removeItem('token');
  //     console.log('Token expired.');
  //     return (window.location.href = '/');
  //   } else {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  // }

  return config;
}

export const axios = Axios.create({
  baseURL: appConfig.appApiUrl,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log({ error });
    const message = error.response?.data?.message || error.message;

    return Promise.reject(error);
  },
);
