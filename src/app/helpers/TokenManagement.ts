import { addTokenToRequestInterceptor, apiService } from '../http/service';

export const tokenManager = async () => {
  const token = localStorage.getItem('hdm:admin:auth-token');

  try {
    if (token) {
      addTokenToRequestInterceptor(token);

      const { data } = await apiService.post('api/token/verify', {});
      if (data.message) {
        throw new Error('Token Expired');
      }

    } else {
      throw new Error('No token found');
    }
  } catch (error) {
    //const { data } = await apiService.post('api/login_check', { 'username': 'antoine@test.com', 'password': 'test' });
    // const { data } = await apiService.post('api/login_check', { 'username': 'test2@test1.com', 'password': 'test' });
    //
    // if (!data.token) {
    //   throw new Error('No token in the response');
    // }
    //
    // localStorage.setItem('hdm:admin:auth-token', data.token);
    window.location.href = '/?logout';
  }

  // localStorage.setItem('hdm:admin:current-user', 'antoine@test.com');
  // localStorage.setItem('hdm:admin:current-user', 'test2@test1.com');

  const user = await apiService.post('api/users/filter-username',
    { 'username': localStorage.getItem('hdm:admin:current-user') },
  );

  localStorage.setItem('hdm:admin:current-user-id', JSON.stringify(user.data.id));
};