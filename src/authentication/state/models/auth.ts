import { addTokenToRequestInterceptor, apiService, clearTokenFromAxios } from '../../../app/http/service';
import { createModel } from '@rematch/core';
import { Toastify } from '../../../helpers/Toastify';

export interface UserAuthenticationDto {
  username: string,
  password: string,
}

interface AuthState {
  isRequesting: boolean
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
    setIsVerifiedToken: (state: AuthState, payload: boolean): AuthState => ({ ...state, isVerifiedToken: payload }),
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
        await clearTokenFromAxios();
        
        new Toastify().error(
          'You are no longer logged in the application. You will be redirected in 5 seconds.',
        );
      } finally {
        this.setIsVerifiedToken(true);
      }
    },

    async login(dto: UserAuthenticationDto) {
      this.setIsRequesting(true);
      try {
        const { data } = await apiService.post('/api/login_check', dto);

        if (!data.token) {
          throw new Error('there is no token in the response');
        }

        this.updateToken(data.token);
        
        localStorage.setItem('hdm:admin:auth-token', data.token);
      } catch (error) {
        new Toastify().error(`Failed to login. ${error.message}`);
      } finally {
        this.setIsRequesting(false);
      }
    },

    async logout() {
      await clearTokenFromAxios();
      this.clearToken();
      localStorage.clear();
    },
  },
});
