import { AuthenticationState } from '../components/AuthenticationForm';
import { PropsForInputWithoutFunc } from '../index.d';

export const arrayOfFormPropsConstructor = (state: AuthenticationState): PropsForInputWithoutFunc[] => {
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