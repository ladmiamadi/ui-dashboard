import { addTokenToRequestInterceptor, apiService, clearTokenFromAxios } from '../../../app/http/service';
import { createModel } from '@rematch/core';
import { Toastify } from '../../../helpers/Toastify';

export interface UserAuthenticationDto {
  username: string,
  password: string,
}

interface AuthState {
  isRequesting: boolean,
  isVerifiedToken: boolean,
  token: string | null,
}

export const auth = createModel({
  state: {
    isRequesting: false,
    isVerifiedToken: false,
    token: null,
  },
  reducers: {
    clearToken: (state: AuthState): AuthState => ({ ...state, token: null }),
    setIsVerifiedToken: (state: AuthState, isVerifiedToken: boolean): AuthState => ({ ...state, isVerifiedToken }),
    setIsRequesting: (state: AuthState, isRequesting: boolean): AuthState => ({ ...state, isRequesting }),
    updateToken: (state: AuthState, token: string): AuthState => ({ ...state, token }),
  },
  effects: {
    async verifyToken(token: string) {
      try {
        addTokenToRequestInterceptor(token);

        await apiService.post('api/token/verify', {});

        this.updateToken(token);
      } catch (error) {
        setTimeout(() => new Toastify().error('You are no longer logged in the application.'));
        //new Toastify().error('You are no longer logged in the application.');
        await clearTokenFromAxios();
        this.clearToken();
        //setTimeout(localStorage.clear, 5000);
        localStorage.clear();
      } finally {
        this.setIsVerifiedToken(true);
      }
    },
    async logout() {
      await clearTokenFromAxios();
      this.clearToken();
      localStorage.clear();
    },
  },
});
