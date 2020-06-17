import { PropsForInputWithoutFunc } from '../index.d';

export const arrayOfFormPropsConstructor = (): PropsForInputWithoutFunc[] => {
  return (
    [
      {
        id: 'username',
        label: 'Email',
        placeholder: 'admin@hdm.be',
        type: 'email',
      },
      {
        id: 'password',
        label: 'Password',
        placeholder: '********',
        type: 'password',
      },
    ]
  );
};