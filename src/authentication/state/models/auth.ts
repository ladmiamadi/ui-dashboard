import { createModel } from '@rematch/core';
import { addTokenToRequestInterceptor, apiService, clearTokenFromAxios } from '../../../app/http/service';
import { Toastify } from '../../../helpers/Toastify';

export interface UserAuthenticationDto {
	email: string;
	username: string;
	password: string;
}

type AuthState = {
	token: string | null;
	isVerifiedToken: boolean;
};

export const auth = createModel({
  state: {
    token: null,
    isVerifiedToken: false,
  },
  reducers: {
    updateToken: (state: AuthState, payload: string): AuthState => ({ ...state, token: payload }),
    setIsVerifiedToken: (state: AuthState, payload: boolean): AuthState => ({ ...state, isVerifiedToken: payload }),
    clearToken: (state: AuthState): AuthState => ({ ...state, token: null }),
  },
  effects: {
    async verifyToken(token: string) {
      try {
        addTokenToRequestInterceptor(token);
        await apiService.post('api/token/verify', {});
        this.updateToken(token);
      } catch (error) {
        await clearTokenFromAxios();
        new Toastify().error(
          'You are no longer logged in the application. You will be redirected in 5 seconds.',
        );
      } finally {
        this.setIsVerifiedToken(true);
      }
    },

    async login(dto: UserAuthenticationDto) {
      try {
        const { data } = await apiService.post('/api/login_check', dto);
        if (!data.token) {
          throw new Error('there is no token in the response');
        }

        this.updateToken(data.token);
        localStorage.setItem('hdm:admin:auth-token', data.token);
      } catch (error) {
        new Toastify().error(`Failed to login. ${error.message}`);
      }
    },

    async logout() {
      await clearTokenFromAxios();
      this.clearToken();
      localStorage.clear();
    },
  },
});
