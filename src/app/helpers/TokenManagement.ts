import { addTokenToRequestInterceptor, apiService, clearTokenFromAxios } from '../http/service';

export const refreshToken = async () => {
  const token = localStorage.getItem('hdm:admin:auth-token');
  const refreshToken = localStorage.getItem('hdm:admin:refresh-token');

  try {
    if (token && refreshToken) {
      addTokenToRequestInterceptor(token);

      const { data } = await apiService.post('/api/token/refresh', { refresh_token: refreshToken });

      if (data.message) {
        throw new Error('Token Invalid or Expired');
      } else {
        localStorage.setItem('hdm:admin:auth-token', data.token);
        clearTokenFromAxios();
        addTokenToRequestInterceptor(data.token);
      }
    } else {
      throw new Error('Missing token or refresh token');
    }
  } catch (error) {
    //Revert commented/uncommented code for build
    /*
    const { data } = await apiService.post('api/login_check', { username: 'test1@test.com', password: 'test' });

    if (!data.token) {
      throw new Error('No token in the response');
    }

    localStorage.setItem('hdm:admin:auth-token', data.token);
    localStorage.setItem('hdm:admin:refresh-token', data.refresh_token);

    // window.location.href = '/fr?logout';
    */
  }
};
