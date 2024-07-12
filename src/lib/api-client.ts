import { appConfig } from '@/config/appConfig';
import storage from '@/utils/storage';
import Axios, { InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  const token = storage.get('jwt');
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentDate = new Date();
    if (decodedToken.exp && decodedToken.exp * 1000 < currentDate.getTime()) {
      storage.removeItem('jwt');
      console.log('Token expired.');
      window.location.href = '/';
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

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
    return Promise.reject(error);
  },
);
