import { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { env } from '../../helpers/environment';
import { Toastify } from '../../helpers/Toastify';

let tokenInterceptor: number = -1;

export const apiService = axios.create({
  baseURL: env('API_URL'),
});

export const addTokenToRequestInterceptor = (token: string) => {
  tokenInterceptor = apiService.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
};

apiService.interceptors.response.use((response) => {
  if (tokenInterceptor === -1 && response.data.token) {
    addTokenToRequestInterceptor(response.data.token);
  }

  if (response.status === 401) {
    (new Toastify()).error('Your session isn\'t valid anymore. ' +
      'You will be disconnected in 5 seconds.');

    setTimeout(() => {
      document.location.href = '/fr/?logout';
    }, 5000);
  }

  return response;
});

export const clearTokenFromAxios = () => {
  return new Promise((resolve) => {
    apiService.interceptors.request.eject(tokenInterceptor);
    tokenInterceptor = -1;
    resolve();
  });
};
