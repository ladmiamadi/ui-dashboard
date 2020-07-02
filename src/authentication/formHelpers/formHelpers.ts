import { AuthenticationState } from '../components/AuthenticationForm';
import { AuthAttributes } from '../index.d';

export const arrayOfFormPropsConstructor = (state: AuthenticationState): AuthAttributes[] => {
  return (
    [
      {
        id: 'username',
        label: 'Email',
        placeholder: 'admin@hdm.be',
        type: 'email',
        value: state.username,
      },
      {
        id: 'password',
        label: 'Password',
        placeholder: '********',
        type: 'password',
        value: state.password,
      },
    ]
  );
};