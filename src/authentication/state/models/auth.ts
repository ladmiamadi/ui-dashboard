import { addTokenToRequestInterceptor, apiService, clearTokenFromAxios } from '../../../app/http/service';
import { createModel } from '@rematch/core';

interface AuthState {
  isVerifiedToken: boolean,
  token: string | null,
}

export const auth = createModel({
  state: {
    isVerifiedToken: false,
    token: null,
  },
  reducers: {
    clearToken: (state: AuthState): AuthState => ({ ...state, token: null }),
    setIsVerifiedToken: (state: AuthState, isVerifiedToken: boolean): AuthState => ({ ...state, isVerifiedToken }),
    updateToken: (state: AuthState, token: string): AuthState => ({ ...state, token }),
  },
  effects: {
    async verifyToken(token: string) {
      addTokenToRequestInterceptor(token);

      await apiService.post('api/token/verify', {});

      this.updateToken(token);
      this.setIsVerifiedToken(true);
    },
    async logout() {
      await clearTokenFromAxios();
      this.clearToken();
      localStorage.clear();
      document.location.href = 'https://www.hdmnetwork.com';
    },
  },
});
