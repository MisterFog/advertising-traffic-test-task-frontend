import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE,
  headers: {
    Accept: 'application/json, text/plain, */*',
  },
});

api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json;charset=utf-8';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.request.use((config: AxiosRequestConfig | any) => {
  const token = localStorage.getItem('authToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return {
    ...config,
    headers: {
      ...config.headers,
    },
  };
});

api.interceptors.response.use(
  (data: AxiosResponse) => data,
  (error: AxiosError) => {
    if (error.response?.status === 400) {
      return { warning: error.response };
    }

    return { error: error.response };
  }
);

export default api;
