import { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { env } from '../../helpers/environment';

let tokenInterceptor: number = -1;

export const apiService = axios.create({
  baseURL: env('API_URL'),
});

export const addTokenToRequestInterceptor = (token: string) => {
  tokenInterceptor = apiService.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${ token }`;

    return config;
  });
};

apiService.interceptors.response.use(
  (response) => {
    if (tokenInterceptor === -1 && response.data.token) {
      addTokenToRequestInterceptor(response.data.token);
    }

    return response;
  },
);

export const clearTokenFromAxios = () => {
  return new Promise((resolve) => {
    apiService.interceptors.request.eject(tokenInterceptor);
    tokenInterceptor = -1;
    resolve();
  });
};