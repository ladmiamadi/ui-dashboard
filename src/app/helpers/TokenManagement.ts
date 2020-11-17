import { addTokenToRequestInterceptor, apiService } from '../http/service';

export const tokenManager = async () => {
  const token = localStorage.getItem('hdm:admin:auth-token');

  try {
    if (token) {
      addTokenToRequestInterceptor(token);

      await apiService.post('api/token/verify', {});
    } else {
      throw new Error('No token found');
    }

  } catch (error) {
    const { data } = await apiService.post('api/login_check', { 'username': 'antoine@test.com', 'password': 'test' });

    if (!data.token) {
      throw new Error('No token in the response');
    }

    localStorage.setItem('hdm:admin:auth-token', data.token);
  }
};